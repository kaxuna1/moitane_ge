package com.technonet.controlers;

import com.technonet.Repository.CityRepo;
import com.technonet.Repository.CountryRepo;
import com.technonet.model.City;
import com.technonet.model.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kakha on 3/2/2017.
 */
@Controller
public class CityController {
    @GetMapping("/cities/{id}")
    @ResponseBody
    public List<City> getCities(@PathVariable("id") long id){
        return cityRepo.findByCountry(countryRepo.findOne(id));
    }
    @GetMapping("/cities")
    @ResponseBody
    public List<City> getCities(){
        return cityRepo.findAll();
    }

    @Autowired
    public CityRepo cityRepo;
    @Autowired
    public CountryRepo countryRepo;
}
