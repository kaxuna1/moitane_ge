package com.technonet.Repository;

import com.technonet.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by vakhtanggelashvili on 3/15/17.
 */
@Transactional
public interface OrderRepo extends JpaRepository<Order,Long> {
    Order findByUuidAndActive(String uuid, boolean active);

    Page<Order> findByActiveOrderByCreateDateDesc(boolean active, Pageable pageable);

    @Query("select o from  Order o where o.active=true and o.createDate<:date and o.confirmed = false")
    List<Order> findUnpaidOld(@Param("date") Date date);

    @Query(value = "SELECT o.* FROM orders o " +
            "RIGHT JOIN booked_time b ON o.order_id = b.order_id " +
            "WHERE o.active = 1 AND o.confirmed = 1 " +
            "AND b.end_date<NOW() " +
            "AND o.order_id NOT IN " +
            "(SELECT k.order_id FROM " +
            "orders k JOIN booked_time bt " +
            "on bt.order_id = k.order_id " +
            "WHERE bt.end_date > NOW()) " +
            "GROUP BY o.order_id",nativeQuery = true)
    List<Order> findFinished();
}
