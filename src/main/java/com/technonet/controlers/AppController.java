package com.technonet.controlers;

import com.technonet.Enums.InfoRecordTypes;
import com.technonet.Repository.*;
import com.technonet.model.*;
import com.technonet.staticData.PermisionChecks;
import com.technonet.staticData.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.technonet.staticData.PermisionChecks.isAdmin;

/**
 * Created by kakha on 3/2/2017.
 */
@Controller
public class AppController {
    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    public AppController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }

    @GetMapping(value = "/", produces = "text/html")
    public String admin(Model model,
                        @CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                        @CookieValue(value = "lang", defaultValue = "1") int lang) {
        boolean isTeacher = false;
        Session sessiona;
        Variables.myThreadLocal.set(lang);
        Map<String, String> stringMap = Variables.stringsMap.get(lang);
        model.addAttribute("strings", stringMap);
        if (sessionId != 0) {
            sessiona = sessionRepository.findOne(sessionId);
            if (sessiona.isIsactive()) {
                model.addAttribute("sessionobj", sessiona);
                model.addAttribute("userNameSurname", sessiona.getUser().getNameSurname());
                model.addAttribute("userId", sessiona.getUser().getId());
                String profilePicUrl = "/profilePic/" + sessiona.getUser().getId() + "?" + Math.random();

                List<Category> categories = categoryRepo.findByActiveAndVisible(true, true);
                User user = sessiona.getUser();
                user.getUserCategoryJoins().stream().forEach(userCategoryJoin -> categories.remove(userCategoryJoin.getCategory()));
                categories.forEach(category -> category.setLang(lang));


                isTeacher =  user.getUserCategoryJoins().size()>0;

                if (!sessiona.getUser().getFacebookId().isEmpty()) {
                    profilePicUrl = "http://graph.facebook.com/" + sessiona.getUser().getFacebookId() + "/picture?type=large";
                }
                model.addAttribute("profilePicUrl", profilePicUrl);

                model.addAttribute("loggedIn", true);


            } else {
                model.addAttribute("loggedIn", false);
            }
        } else {
            model.addAttribute("loggedIn", false);
        }
        model.addAttribute("isTeacher", isTeacher);
        return "main/index";
    }



    @GetMapping(value = "/confirmtoken", produces = "text/html")
    public String confirmToken(Model model, @RequestParam(name = "token", defaultValue = "") String token) {
        if (token.isEmpty()) {
            return "redirect:/";
        }
        ConfirmationToken confirmationToken = confirmationTokenRepo.findByToken(token);
        //TODO გაგზავნის დროის შემოწმება. არ დაადასტუროს თუ 1 საათზე ძველია.
        //TODO ახალი ტოკენის მოთხოვნის ღილაკი დაემატოს სეთინგებში.
        if (confirmationToken.isConfimed())
            return "redirect:/";
        confirmationToken.confirmToken();
        confirmationTokenRepo.save(confirmationToken);

        return "redirect:/";
    }

    private Pageable constructPageSpecification(int pageIndex, int size) {
        return new PageRequest(pageIndex, size);
    }

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SysStringRepo sysStringRepo;
    @Autowired
    private ConfirmationTokenRepo confirmationTokenRepo;

    @Autowired
    private RatingRepo ratingRepo;
    @Autowired
    private BookedTimeRepo bookedTimeRepo;
    @Autowired
    private CategoryRepo categoryRepo;
}
