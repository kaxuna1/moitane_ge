package com.technonet.controlers

import com.technonet.Enums.JsonReturnCodes
import com.technonet.Repository.ProductSubTypeRepo
import com.technonet.Repository.ProductTypeRepo
import com.technonet.Repository.SessionRepository
import com.technonet.model.JsonMessage
import com.technonet.model.ProductSubType
import com.technonet.model.ProductType
import com.technonet.staticData.PermisionChecks
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Controller
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*


@Controller
@Transactional
open class ProductTypeController(val productTypeRepo: ProductTypeRepo,
                                 val productSubTypeRepo: ProductSubTypeRepo,
                                 val sessionRepository: SessionRepository) {


    @RequestMapping("/createProuctType")
    @ResponseBody
    open fun createProuctType(@CookieValue(value = "projectSessionId", defaultValue = "0") sessionId: Long,
                              @RequestParam(value = "name", required = true, defaultValue = "") name: String): Any {

        val session = sessionRepository.findOne(sessionId);

        if (PermisionChecks.isAdmin(session)) {
            val productType = ProductType(name)
            try {
                productTypeRepo.save(productType)
                return JsonMessage(JsonReturnCodes.Ok)
            } catch (e: Exception) {
                e.printStackTrace();
                return JsonMessage(JsonReturnCodes.ERROR)
            }
        } else {
            return JsonMessage(JsonReturnCodes.ERROR)
        }
    }

    @RequestMapping("/productTypes/{index}")
    @ResponseBody
    open fun productTypes(@PathVariable("index") index: Int): Any {
        return productTypeRepo.findAll(constructPageSpecification(index, 10))
    }

    @RequestMapping("/createSubType")
    @ResponseBody
    open fun createSubType(@CookieValue(value = "projectSessionId", defaultValue = "0") sessionId: Long,
                           @RequestParam(value = "name", required = true, defaultValue = "") name: String,
                           @RequestParam(value = "type", required = true, defaultValue = "") type: Long): Any {

        val session = sessionRepository.findOne(sessionId);

        if (PermisionChecks.isAdmin(session)) {
            try {

                var subType = ProductSubType(name, productTypeRepo.findOne(type))
                productSubTypeRepo.save(subType)
                return JsonMessage(JsonReturnCodes.Ok)

            } catch (e: Exception) {
                e.printStackTrace();
                return JsonMessage(JsonReturnCodes.ERROR)
            }
        } else {
            return JsonMessage(JsonReturnCodes.ERROR)
        }

    }
    @RequestMapping("/productSubTypes/{type}/{index}")
    @ResponseBody
    open fun productSubTypes(@PathVariable("index") index: Int,@PathVariable("type") type: Long): Any {
        return productSubTypeRepo.findByProductTypeAndActive(productTypeRepo.findOne(type),true,constructPageSpecification(index,100))
    }



    @RequestMapping("/types")
    @ResponseBody
    open fun type():Any{
        return productTypeRepo.findByActive(true);
    }
    @RequestMapping("/subTypes")
    @ResponseBody
    open fun type():Any{
        return productTypeRepo.findByActive(true);
    }


    private fun constructPageSpecification(pageIndex: Int, size: Int): Pageable {
        return PageRequest(pageIndex, size)
    }
}