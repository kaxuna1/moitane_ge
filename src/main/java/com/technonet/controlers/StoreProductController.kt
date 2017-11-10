package com.technonet.controlers

import com.technonet.Enums.JsonReturnCodes
import com.technonet.Repository.*
import com.technonet.model.JsonMessage
import com.technonet.model.ProductType
import com.technonet.model.StoreProduct
import com.technonet.staticData.PermisionChecks
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Controller
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@Controller
@Transactional
open class StoreProductController(val sessionRepository: SessionRepository,
                                  val productRepo: StoreProductController,
                                  val productSubTypeRepo: ProductSubTypeRepo,
                                  val productTypeRepo: ProductTypeRepo,
                                  val storeRepo: StoreRepo,
                                  val storeProductRepo: StoreProductRepo) {
    @RequestMapping("/createStoreProduct")
    @ResponseBody
    open fun createProuctType(@CookieValue(value = "projectSessionId", defaultValue = "0") sessionId: Long,
                              @RequestParam(value = "name", required = true, defaultValue = "") name: String,
                              @RequestParam(value = "type", required = true, defaultValue = "") type: Long,
                              @RequestParam(value = "price", required = true, defaultValue = "") price: Double,
                              @RequestParam(value = "subType", required = true, defaultValue = "") subType: Long): Any {

        val session = sessionRepository.findOne(sessionId);

        if (PermisionChecks.storeProductManagement(session)) {
            val storeProduct = StoreProduct(name,session.user.store,productTypeRepo.findOne(type),productSubTypeRepo.findOne(subType),session.user)
            try {
                storeProductRepo.save(storeProduct)
                return JsonMessage(JsonReturnCodes.Ok)
            } catch (e: Exception) {
                e.printStackTrace();
                return JsonMessage(JsonReturnCodes.ERROR)
            }
        } else {
            return JsonMessage(JsonReturnCodes.ERROR)
        }
    }
    @RequestMapping("/getStoreProducts/{index}")
    @ResponseBody
    open fun getStoreProducts(@CookieValue(value = "projectSessionId", defaultValue = "0") sessionId: Long,
                              @PathVariable("index") index: Int):Any{
        val session = sessionRepository.findOne(sessionId);
        if (PermisionChecks.storeProductManagement(session)) {
            try{

                return storeProductRepo.getProductsForStoreAdmin(session.user.store,constructPageSpecification(index,10))
            }catch (e:Exception){
                e.printStackTrace();
                return JsonMessage(JsonReturnCodes.ERROR)
            }

        } else {
            return JsonMessage(JsonReturnCodes.ERROR)
        }


    }




    private fun constructPageSpecification(pageIndex: Int, size: Int): Pageable {
        return PageRequest(pageIndex, size)
    }
}