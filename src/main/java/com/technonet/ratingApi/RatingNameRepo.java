package com.technonet.ratingApi;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxge on 8/2/2017.
 */
@Transactional
public interface RatingNameRepo extends JpaRepository<RatingName,Long> {

    RatingName findByCode(String code);
}
