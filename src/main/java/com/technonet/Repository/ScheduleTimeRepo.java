package com.technonet.Repository;

import com.technonet.model.Schedule;
import com.technonet.model.ScheduleTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.util.List;

/**
 * Created by kakha on 3/11/2017.
 */
public interface ScheduleTimeRepo extends JpaRepository<ScheduleTime,Long> {
    List<ScheduleTime> findByScheduleAndActiveOrderByStartTimeAsc(Schedule schedule, boolean active);

    List<ScheduleTime> findByStartTimeAfterAndEndTimeBeforeAndActive(Time startTime, Time endTime, boolean active);

    @Query(value = "SELECT st FROM ScheduleTime st WHERE st.startTime<:from1 " +
            "AND st.endTime > :to and st.active=true and st.schedule=:schedule")
    List<ScheduleTime> findBetweenSchedule(@Param("from1") Time from1, @Param("to") Time to,@Param("schedule") Schedule schedule);
}
