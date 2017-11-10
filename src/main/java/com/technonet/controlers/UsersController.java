package com.technonet.controlers;


import com.technonet.Enums.ConfirmationTypes;
import com.technonet.Enums.JsonReturnCodes;
import com.technonet.Enums.Languages;
import com.technonet.Repository.*;
import com.technonet.model.*;
import com.technonet.staticData.PermisionChecks;
import org.apache.commons.codec.language.bm.Lang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by vakhtanggelashvili on 10/21/15.
 */
@Controller
public class UsersController {


    @RequestMapping("/getuserbyid/{page}")
    @ResponseBody
    public Page<User> getUserById(@CookieValue("projectSessionId") long sessionId, @PathVariable("page") int page) {

        Session session = sessionDao.findOne(sessionId);
        boolean k = PermisionChecks.isAdmin(session);
        if (k) {
            return userDao.findByActive(true, constructPageSpecification(page));
        } else {
            return null;
        }
    }

    @RequestMapping("/createuser")
    @ResponseBody
    public JsonMessage create(@CookieValue("projectSessionId") String sessionId,
                              @RequestParam(value = "username", required = true, defaultValue = "") String username,
                              @RequestParam(value = "password", required = true, defaultValue = "") String password,
                              @RequestParam(value = "email", required = true, defaultValue = "") String email,
                              @RequestParam(value = "name", required = false, defaultValue = "") String name,
                              @RequestParam(value = "surname", required = false, defaultValue = "") String surname,
                              @RequestParam(value = "address", required = false, defaultValue = "") String address,
                              @RequestParam(value = "mobile", required = false, defaultValue = "") String mobile,
                              @RequestParam(value = "personalNumber", required = false, defaultValue = "") String personalNumber,
                              @RequestParam(value = "city", required = false, defaultValue = "0") long city,
                              @RequestParam(value = "store", required = false, defaultValue = "0") long store,
                              @RequestParam(value = "sex", required = false, defaultValue = "0") int sex) {


        User user = new UserBuilder().setAddress(address)
                .setUsername(username)
                .setPassword(password)
                .setEmail(email)
                .setName(name)
                .setSurname(surname)
                .setAddress(address)
                .setMobile(mobile)
                .setPersonalNumber(personalNumber)
                .setType(0)
                .setSessions(new ArrayList<Session>())
                .setCity(cityRepo.findOne(city))
                .createUser();
        user.setSex(sex);
        user.setStore(storeRepo.findOne(store));
        try {
            userDao.save(user);
        } catch (Exception ex) {

            return new JsonMessage(JsonReturnCodes.ERROR.getCODE(), ex.toString());
        }
        return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "მომხმარებელი შეიქმნა წარმატებით");
    }

    @RequestMapping("/registerapi")
    @ResponseBody
    public Session registerApi(@RequestParam(value = "password", required = true, defaultValue = "") String password,
                               @RequestParam(value = "email", required = true, defaultValue = "") String email,
                               @RequestParam(value = "name", required = false, defaultValue = "") String name,
                               @RequestParam(value = "day", required = false, defaultValue = "") int day,
                               @RequestParam(value = "month", required = false, defaultValue = "") int month,
                               @RequestParam(value = "year", required = false, defaultValue = "") int year,
                               @RequestParam(value = "surname", required = false, defaultValue = "") String surname,
                               @RequestParam(value = "fbId", required = false, defaultValue = "") String fbId,
                               @RequestParam(value = "googleId", required = false, defaultValue = "") String googleId) {
        if (password.isEmpty() || email.isEmpty() || emailExists(email) || name.isEmpty() || surname.isEmpty()) {
            return new Session();
        }
        User user = new User(password, email, name, surname);
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month, day);


        if (!fbId.isEmpty()) {
            user.setFacebookId(fbId);
        }
        if (!googleId.isEmpty()) {
            user.setGoogleId(googleId);
        }
        userDao.save(user);
        Session session = new Session(new Date(), user);
        session = sessionDao.save(session);

        return session;
    }


    @RequestMapping("/addinfotouser")
    @ResponseBody
    public JsonMessage addInfo(@CookieValue("projectSessionId") long sessionId, long userId, int type, String value) {
        Session session = sessionDao.findOne(sessionId);
        if (PermisionChecks.isAdmin(session)) {
            InfoRecord infoRecord = new InfoRecord();
            infoRecord.setValue(value);
            infoRecord.setType(type);
            infoRecord.setUser(userDao.findOne(userId));

            try {
                infoRecordRepo.save(infoRecord);
                return new JsonMessage(JsonReturnCodes.Ok);
            } catch (Exception e) {
                e.printStackTrace();
                return new JsonMessage(JsonReturnCodes.ERROR);
            }

        } else {
            return new JsonMessage(JsonReturnCodes.DONTHAVEPERMISSION);
        }

    }

    @RequestMapping("/getuserinforecords/{id}")
    @ResponseBody
    public List<InfoRecord> getUserInfoRecords(@PathVariable("id") long id) {
        return userDao.findOne(id).getInfoRecords();
    }


    @RequestMapping("/giveuserpermission")
    @ResponseBody
    public JsonMessage giveUserPermissions(long id, @RequestParam(value = "ids") ArrayList<Long> ids) {

        User user = userDao.findOne(id);
        for (Long id1 : ids) {
            user.getPermissions().add(permissionRepo.findOne(id1));
        }
        userDao.save(user);
        return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "წარმატებით");

    }

    @RequestMapping("/removeuserpermission")
    @ResponseBody
    public JsonMessage removeUserPermissions(long id, @RequestParam(value = "ids") ArrayList<Long> ids) {

        User user = userDao.findOne(id);
        for (Long id1 : ids) {
            user.getPermissions().remove(permissionRepo.findOne(id1));
        }
        userDao.save(user);
        return new JsonMessage(JsonReturnCodes.Ok.getCODE(), "წარმატებით");

    }

    @RequestMapping("/changepassword")
    public boolean changePassword(@CookieValue("projectSessionId") long sessionId, String password) {
        try {
            Session session = sessionDao.findOne(sessionId);

            User user = session.getUser();
            if (!password.isEmpty()) {
                user.setPassword(password);
                userDao.save(user);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @RequestMapping("/edituser")
    @ResponseBody
    public boolean editUser(@CookieValue("projectSessionId") long sessionId, User k) {

        Session session = sessionDao.findOne(sessionId);

        User user = session.getUser();

        if (k.getAddress() != null) {
            user.setAddress(k.getAddress());
        }
        if (k.getEmail() != null) {
            user.setEmail(k.getEmail());
        }
        if (k.getUsername() != null) {
            user.setUsername(k.getUsername());
        }
        if (k.getPassword() != null) {
            user.setPassword(k.getPassword());
        }
        if (k.getName() != null) {
            user.setName(k.getName());
        }
        if (k.getSurname() != null) {
            user.setSurname(k.getSurname());
        }
        if (k.getMobile() != null) {
            user.setMobile(k.getMobile());
        }
        if (k.getPersonalNumber() != null) {
            user.setPersonalNumber(k.getPersonalNumber());
        }
        if (k.getType() != 0) {
            user.setType(k.getType());
        }

        try {
            userDao.save(user);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @RequestMapping("/deleteuser")
    @ResponseBody
    public String deleteUser(long id) {
        try {
            userDao.delete(id);
            return "წაიშალა წარმატებით";
        } catch (Exception e) {
            return "წაშლის დროს მოხდა შეცდომა";
        }
    }

    private Pageable constructPageSpecification(int pageIndex) {
        Pageable pageSpecification = new PageRequest(pageIndex, 10);
        return pageSpecification;
    }

    @RequestMapping("/getuser/{id}")
    @ResponseBody
    public User getUser(@CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        if (PermisionChecks.isAdmin(sessionDao.findOne(sessionId))) {
            return userDao.findOne(id);
        } else {
            return null;
        }
    }

    @RequestMapping("/mydata")
    @ResponseBody
    public User getMyData(@CookieValue("projectSessionId") long sessionId) {
        return sessionDao.findOne(sessionId).getUser();
    }

    @RequestMapping("/disconnect/{type}")
    @ResponseBody
    public boolean disconnect(@CookieValue("projectSessionId") long sessionId, @PathVariable("type") int type) {
        Session session = sessionDao.findOne(sessionId);
        if (type == 1) {
            session.getUser().setFacebookId("");
        }
        if (type == 2) {
            session.getUser().setGoogleId("");
        }
        if (type == 3) {
            session.getUser().setCalendarRefreshToken("");
            session.getUser().setCalendarId("");
        }
        if (type == 4) {
            session.getUser().setCalendarId("");
        }
        sessionDao.save(session);

        return true;

    }

    @RequestMapping("/getusers")
    @ResponseBody
    public Page<Object> getusers(@CookieValue("projectSessionId") String sessionId, int index, String search,
                                 @RequestParam(value = "fora", required = false, defaultValue = "1") int fora) {

        return userDao.findByUsernameOrEmailOrAddress(search, search, search, constructPageSpecification(index));

    }

    @RequestMapping("/connectSocial/{type}")
    @ResponseBody
    public boolean connectSocial(@CookieValue("projectSessionId") long sessionId, @PathVariable("type") int type, @RequestParam(name = "value") String value) {
        Session session = sessionDao.findOne(sessionId);
        if (type == 1) {
            if (userDao.findByFacebookIdAndActive(value, true).size() == 0) {
                session.getUser().setFacebookId(value);
            } else {
                return false;
            }
        }
        if (type == 2) {
            if (userDao.findByGoogleIdAndActive(value, true).size() == 0) {
                session.getUser().setGoogleId(value);
            } else {
                return false;
            }
        }
        sessionDao.save(session);

        return true;
    }

    @RequestMapping("/editme")
    @ResponseBody
    public boolean editMe(@CookieValue("projectSessionId") long sessionId,
                          @RequestParam(name = "name", defaultValue = "") String name,
                          @RequestParam(name = "surname", defaultValue = "") String surname,
                          @RequestParam(name = "email", defaultValue = "") String email,
                          @RequestParam(name = "address", defaultValue = "") String address,
                          @RequestParam(name = "pn", defaultValue = "") String pn,
                          @RequestParam(name = "phone", defaultValue = "") String phone,
                          @RequestParam(name = "about", defaultValue = "") String about,
                          @RequestParam(name = "academic", defaultValue = "") String academic,
                          @RequestParam(name = "current", defaultValue = "") String current,
                          @RequestParam(name = "succeed", defaultValue = "") String succeed,
                          @RequestParam(name = "password", defaultValue = "") String password,
                          @RequestParam(name = "skills", defaultValue = "") String skills,
                          @RequestParam(name = "cal", defaultValue = "") String cal,
                          @RequestParam(name = "birthDate", defaultValue = "0") long birthDate,
                          @RequestParam(name = "lang", defaultValue = "0") int lang,
                          @RequestParam(name = "city", defaultValue = "0") long city) {

        Session session = sessionDao.findOne(sessionId);
        User user = session.getUser();
        if (!name.isEmpty())
            user.setName(name);
        if (!about.isEmpty())
            user.setAbout(about);
        if (!password.isEmpty())
            user.setPassword(password);
        if (!address.isEmpty())
            user.setAddress(address);
        user.setSurname(surname);
        if (!email.isEmpty()) {
            if (emailExists(email) && !user.getEmail().equals(email))
                return false;

            ConfirmationToken confirmationToken = new ConfirmationToken(ConfirmationTypes.EMAIL.getCODE(), user);
            confirmationToken.setMailForConfirmation(email);
            try {
                confirmationTokenRepo.save(confirmationToken);
                user.setConfirmedEmail(false);
                user.setEmail(email);
                confirmationToken.sendMail();
            } catch (Exception e) {
                return false;
            }
        }
        if (!cal.isEmpty())
            user.setCalendarId(cal);
        if (!phone.isEmpty())
            user.setMobile(phone);
        if (!pn.isEmpty())
            user.setPersonalNumber(pn);
        if (lang != 0 && Languages.valueOf(lang) != null)
            user.setLanguage(lang);
        if (city != 0)
            user.setCity(cityRepo.findOne(city));

        userDao.save(user);
        return true;
    }

    @RequestMapping("getlanguages")
    @ResponseBody
    public List<IdNameData> getLanguages() {
        List<IdNameData> data = new ArrayList<>();
        for (int i = 0; i < Languages.values().length; i++) {
            data.add(new IdNameData(Languages.values()[i].getCODE(), Languages.values()[i].name()));
        }
        return data;
    }

    @RequestMapping("/emailexists")
    @ResponseBody
    public boolean emailExists(@RequestParam(name = "email", defaultValue = "") String email) {
        return userDao.findByEmailAndActive(email, true).size() > 0;
    }


    @Autowired
    private ConfirmationTokenRepo confirmationTokenRepo;
    @Autowired
    private PermissionRepo permissionRepo;
    @Autowired
    private UserRepository userDao;
    @Autowired
    private SessionRepository sessionDao;
    @Autowired
    private CityRepo cityRepo;
    @Autowired
    private CountryRepo countryRepo;
    @Autowired
    private InfoRecordRepo infoRecordRepo;
    @Autowired
    private StoreRepo storeRepo;
}
