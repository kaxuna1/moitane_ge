package com.technonet.ratingApi

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

/**
 * Created by kaxge on 8/2/2017.
 */
@Controller
@ResponseBody
class RatingSoftController (val ratingSoftRepo: RatingSoftRepo,val ratingNameRepo: RatingNameRepo){
    @RequestMapping("giveratingsoft")
    @ResponseBody
    fun giveRating(rating: Int, code: String): Any {


        ratingSoftRepo.save(RatingSoft(rating,code))
        return mapOf("result" to true)
    }
    @RequestMapping("maindata")

    fun getMainData():Any{
        return ratingSoftRepo.mainData
    }
    @RequestMapping("avg")
    fun getAvg():Any{
        return ratingSoftRepo.avarage
    }
    @RequestMapping("devcount")
    fun getDevCount():Any{
        return ratingSoftRepo.deviceCount
    }
    @RequestMapping("codegivename")
    fun giveName(code: String,name:String):Any?{

        var ratingName:RatingName? = ratingNameRepo.findByCode(code)


        if(ratingName==null){
            ratingName = RatingName()
            ratingName!!.code = code
            ratingName!!.name = name
            ratingNameRepo.save(ratingName)
        }else{
            ratingName.name = name
            ratingNameRepo.save(ratingName)
        }


        return true
    }
}