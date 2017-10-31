package com.technonet.Repository;

import com.technonet.model.Rating;
import com.technonet.model.User;
import com.technonet.model.UserCategoryJoin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Created by vakhtanggelashvili on 5/17/17.
 */
@Transactional
public interface RatingRepo extends JpaRepository<Rating,Long> {
    @Query("select avg(a.score) from Rating a join a.userCategoryJoin ucj where ucj.id=:cid")
    Float getrating(@Param("cid") long cid);
    @Query("select avg(a.scorepunctual) from Rating a join a.userCategoryJoin ucj where ucj.id=:cid")
    Float getratingPunctual(@Param("cid") long cid);
    @Query("select avg(a.scorebalanced) from Rating a join a.userCategoryJoin ucj where ucj.id=:cid")
    Float getratingBalanced(@Param("cid") long cid);
    @Query("select avg(a.scoreresolved) from Rating a join a.userCategoryJoin ucj where ucj.id=:cid")
    Float getratingResolved(@Param("cid") long cid);
    @Query("select count (a.scoreresolved) from Rating a join a.userCategoryJoin ucj where ucj.id=:cid")
    Integer getratingCount(@Param("cid") long cid);
    @Query("select a from Rating a join a.userCategoryJoin ucj where ucj.id=:cid")
    List<Rating> findByJoin(@Param("cid")long id, Pageable pageable);

    List<Rating> findByUserAndUserCategoryJoin(User user, UserCategoryJoin userCategoryJoin);
}
