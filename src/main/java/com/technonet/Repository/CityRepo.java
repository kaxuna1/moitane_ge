package com.technonet.Repository;

import com.technonet.model.City;
import com.technonet.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kakha on 3/2/2017.
 */
@Transactional
public interface CityRepo extends JpaRepository<City,Long> {
    List<City> findByCountry(Country country);
}
