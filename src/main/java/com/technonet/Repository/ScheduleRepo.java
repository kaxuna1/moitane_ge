package com.technonet.Repository;

import com.technonet.model.Category;
import com.technonet.model.Schedule;
import com.technonet.model.User;
import com.technonet.model.UserCategoryJoin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by kakha on 3/11/2017.
 */
public interface ScheduleRepo extends JpaRepository<Schedule,Long> {

    List<Schedule> findByUserCategoryJoinAndActive(UserCategoryJoin userCategoryJoin, boolean active);

    List<Schedule> findByUserCategoryJoinAndActiveAndDayOfWeek(UserCategoryJoin userCategoryJoin, boolean active, int day);
}
