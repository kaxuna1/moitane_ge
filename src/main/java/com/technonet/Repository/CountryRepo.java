package com.technonet.Repository;

import com.technonet.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kakha on 3/2/2017.
 */
@Transactional
public interface CountryRepo extends JpaRepository<Country,Long> {
}
