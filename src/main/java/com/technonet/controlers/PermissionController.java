package com.technonet.controlers;

import com.technonet.Repository.PermissionRepo;
import com.technonet.Repository.SessionRepository;
import com.technonet.Repository.UserRepository;
import com.technonet.model.Permission;
import com.technonet.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kakha on 2/28/2017.
 */
@Controller
public class PermissionController {
    @RequestMapping("/getpermissions")
    @ResponseBody
    public List<Permission> getPermissions(@CookieValue("projectSessionId") String sessionId) {
        return sessionRepository.findOne(Long.parseLong(sessionId)).getUser().getPermissions();
    }

    @RequestMapping("/getuserpermissions/{id}")
    @ResponseBody
    public List<Permission> getUserPermissions(@CookieValue("projectSessionId") String sessionId, @PathVariable("id") long id) {


        Session session = sessionRepository.findOne(Long.parseLong(sessionId));



        return userRepository.findOne(id).getPermissions();

    }

    @RequestMapping("/getnotuserpermissions/{id}")
    @ResponseBody
    public List<Permission> getNotUserPermissions(@CookieValue("projectSessionId") String sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(Long.parseLong(sessionId));




        List<Permission> permissions = permissionRepo.findAll();
        permissions.removeAll(userRepository.findOne(id).getPermissions());
        return permissions;
    }

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PermissionRepo permissionRepo;
}
