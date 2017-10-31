package com.technonet.controlers;

import com.technonet.Repository.*;
import com.technonet.model.BookedTime;
import com.technonet.model.Order;
import com.technonet.model.Session;
import com.technonet.staticData.PermisionChecks;
import com.technonet.staticData.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.function.Consumer;

/**
 * Created by vakhtanggelashvili on 3/25/17.
 */
@Controller
public class OrderController {
    @RequestMapping("/order/{uuid}")
    @ResponseBody
    public Order getOrderById(@CookieValue("projectSessionId") long sessionId,
                              @PathVariable("uuid") String uuid,
                              @CookieValue(value = "lang", defaultValue = "1") int lang) {
        Variables.myThreadLocal.set(lang);
        Session session = sessionRepository.findOne(sessionId);
        Order order = orderRepo.findByUuidAndActive(uuid, true);
        if (PermisionChecks.isAdmin(session) || PermisionChecks.ownOrder(session, order)) {
            return order;
        } else {
            return null;
        }
    }

    @RequestMapping("/order/{uuid}/times")
    @ResponseBody
    public List<BookedTime> getOrderTimesById(@CookieValue("projectSessionId") long sessionId,
                                              @PathVariable("uuid") String uuid) {
        Session session = sessionRepository.findOne(sessionId);
        Order order = orderRepo.findByUuidAndActive(uuid, true);
        if (order == null)
            return null;
        if (PermisionChecks.isAdmin(session) || PermisionChecks.ownOrder(session, order)) {
            return order.getBookedTimes();
        } else {
            return null;
        }
    }

    @RequestMapping("/orders/{page}")
    @ResponseBody
    public Page<Order> getOrders(@CookieValue("projectSessionId") long sessionId,
                                 @PathVariable("page") int page) {
        Session session = sessionRepository.findOne(sessionId);
        if (PermisionChecks.orderManagement(session)) {
            Page<Order> orders = orderRepo.findByActiveOrderByCreateDateDesc(true, constructPageSpecification(page));
            orders.forEach(order -> {
                order.setLang(session.getLang());
            });
            return orders;
        }
        else
            return null;
    }


    private Pageable constructPageSpecification(int pageIndex) {
        return new PageRequest(pageIndex, 10);
    }


    @Autowired
    private PermissionRepo permissionRepo;
    @Autowired
    private UserRepository userDao;
    @Autowired
    private CityRepo cityRepo;
    @Autowired
    private CountryRepo countryRepo;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private ScheduleRepo scheduleRepo;
    @Autowired
    private ScheduleTimeRepo scheduleTimeRepo;
    @Autowired
    private BookedTimeRepo bookedTimeRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private PaymentsRepo paymentsRepo;
}
