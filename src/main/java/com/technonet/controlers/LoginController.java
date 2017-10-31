package com.technonet.controlers;

import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by kakha on 2/27/2017.
 */
@Controller
public class LoginController     {

    private Facebook facebook;
    private ConnectionRepository connectionRepository;

    public LoginController(Facebook facebook, ConnectionRepository connectionRepository) {
        this.facebook = facebook;
        this.connectionRepository = connectionRepository;
    }

    @RequestMapping(value = "/login", produces = "text/html")
    public String login(Model model){
        if (connectionRepository.findPrimaryConnection(Facebook.class) != null) {
            String email=facebook.userOperations().getUserProfile().getEmail();
            model.addAttribute("email", email);
        }else{
            model.addAttribute("email", "");
        }
        return "login";
    }

}
