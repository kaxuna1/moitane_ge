package com.technonet.controlers;

import com.github.kevinsawicki.http.HttpRequest;
import com.technonet.Repository.OrderRepo;
import com.technonet.Repository.PaymentsRepo;
import com.technonet.model.Order;
import com.technonet.model.Payment;
import com.technonet.staticData.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

/**
 * Created by vakhtanggelashvili on 3/15/17.
 */
@Controller
public class PaymentsController {
    @RequestMapping("/confirmpayment")
    @ResponseBody
    public boolean confirmPayment(@RequestParam(value = "token", required = true, defaultValue = "") String token,
                                  @RequestParam(value = "id", required = true, defaultValue = "")String id){
        Payment payment = paymentsRepo.findByUuid(id);
        payment.confirm();
        paymentsRepo.save(payment);
        return true;
    }
    @RequestMapping("/paymentok")
    public String payementOk(@RequestParam("trans_id")String trans_id){
        
        if(Variables.paymentDone(trans_id)){
            List<Payment> paymentList = paymentsRepo.findByTransaction(trans_id);
            if(paymentList.size()==0){
                return "Cant Find Transaction: "+trans_id;
            }else{
                Payment payment = paymentList.get(0);
                Order order = payment.getOrder();
                order.setConfirmed(true);
                order.setConfirmDate(new Date());
                orderRepo.save(order);

            }
        }

        return "redirect:/profile";


        //return "redirect:/";
    }
    @Autowired
    PaymentsRepo paymentsRepo;
    @Autowired
    OrderRepo orderRepo;
}
