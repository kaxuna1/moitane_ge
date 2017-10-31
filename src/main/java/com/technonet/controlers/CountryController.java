package com.technonet.controlers;

import com.technonet.Repository.CountryRepo;
import com.technonet.model.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by kakha on 3/2/2017.
 */
@Controller
public class CountryController {
    @GetMapping("/countries")
    @ResponseBody
    public List<Country> getCountries(){
        return countryRepo.findAll();
    }

    @Autowired
    public CountryRepo countryRepo;
}
