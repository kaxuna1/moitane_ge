package com.technonet.controlers;

import com.technonet.Repository.SessionRepository;
import com.technonet.Repository.UserRepository;
import com.technonet.model.Session;
import com.technonet.staticData.PermisionChecks;
import org.apache.tomcat.util.security.PermissionCheck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.Permission;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

import static com.technonet.staticData.PermisionChecks.*;

/**
 * Created by kakha on 2/27/2017.
 */

@Controller
public class AdminController {
    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    public AdminController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }

    @GetMapping(value = "/admin", produces = "text/html")
    public String admin(Model model,@CookieValue(value = "projectSessionId",defaultValue = "0") long sessionId){

        if(sessionId!=0){
            Session session=sessionRepository.findOne(sessionId);
            if(session.isIsactive()&& isAdmin(session.getUser())){
                model.addAttribute("name","გამარჯობა "+session.getUser().getNameSurname());
                return "admin/index";
            }else {
                return "redirect:/";
            }
        }else{
            return "admin/login";
        }
    }
    @Autowired
    private SessionRepository sessionRepository;


    @Autowired
    private UserRepository userRepository;
}
