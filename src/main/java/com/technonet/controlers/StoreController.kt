package com.technonet.controlers

import com.technonet.Enums.JsonReturnCodes
import com.technonet.Repository.SessionRepository
import com.technonet.Repository.StoreRepo
import com.technonet.Repository.UserRepository
import com.technonet.model.JsonMessage
import com.technonet.model.Store
import com.technonet.staticData.PermisionChecks
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Controller
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@Controller
@Transactional
open class StoreController (val sessionRepository: SessionRepository,
                            val userRepository: UserRepository,
                            val storeRepo: StoreRepo) {
    @RequestMapping("/createStore")
    open fun createStore(@CookieValue("projectSessionId")  sessionId:Long,
                         @RequestParam(value = "name", required = true, defaultValue = "")  name:String):Any {
        val session = sessionRepository.findOne(sessionId)
        if (PermisionChecks.isAdmin(session)) {
            var store = Store(name)
            try{
                storeRepo.save(store)
                return JsonMessage(JsonReturnCodes.Ok)
            }catch (e:Exception){
                e.printStackTrace();
                return JsonMessage(JsonReturnCodes.ERROR)
            }
        }else{
            return JsonMessage(JsonReturnCodes.ERROR)
        }
    }
    @RequestMapping("getStores/{index}")
    @ResponseBody
    open fun getStores(@PathVariable("index")index:Int):Any{
        return storeRepo.findAll(constructPageSpecification(index,10))
    }
    @RequestMapping("/stores")
    @ResponseBody
    open fun stores():Any{
        return storeRepo.findByActive(true)
    }

    @RequestMapping("getStores")
    @ResponseBody
    open fun getStoresAll(@PathVariable("index")index:Int):Any{
        return storeRepo.findAll(constructPageSpecification(index,10))
    }



    private fun constructPageSpecification(pageIndex: Int, size: Int): Pageable {
        return PageRequest(pageIndex, size)
    }

}

