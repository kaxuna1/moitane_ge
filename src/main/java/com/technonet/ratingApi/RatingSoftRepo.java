package com.technonet.ratingApi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by kaxge on 8/2/2017.
 */
public interface RatingSoftRepo extends JpaRepository<RatingSoft,Long> {
    @Query(value = "SELECT rn.name,rs.code,COUNT(rs.code),avg(rating) as sum FROM rating_soft rs LEFT JOIN rating_name rn on rs.code = rn.code GROUP BY rs.code",nativeQuery = true)
    public List<Object> getMainData();

    @Query(value = "SELECT AVG(rating) FROM rating_soft",nativeQuery = true)
    public Object getAvarage();
    @Query(value = "SELECT COUNT(k.id),SUM(k.codes) FROM (SELECT COUNT(code) codes,1 id FROM rating_soft GROUP BY code) as k GROUP by id",nativeQuery = true)
    public Object getDeviceCount();
}
