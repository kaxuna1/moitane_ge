package com.technonet.BackgroundTask;

import com.technonet.Repository.OrderRepo;
import com.technonet.model.Payment;
import com.technonet.staticData.Variables;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * Created by vakhtanggelashvili on 3/26/17.
 */
@Component
@Transactional
public class BackgroundTasks {
    @Transactional
    @Scheduled(fixedRate = 5000)
    public void removeUnpaidOrders(){

    }
    @Transactional
    @Scheduled(fixedRate = 5000)
    public void finishTransactions(){
        /*orderRepo.findFinished().forEach(o->{
            Payment payment = o.getPayments().get(0);
            int sum = Math.round(o.getOrderPrice());//*100+1000;
            //Variables.paymentFinish(payment.getTransaction(),sum);
            o.setActive(false);
            orderRepo.save(o);
        });*/
    }



    @Autowired
    private OrderRepo orderRepo;
}
