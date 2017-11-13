package com.technonet.controlers

import com.technonet.Enums.JsonReturnCodes
import com.technonet.Repository.*
import com.technonet.model.*
import com.technonet.staticData.PermisionChecks
import org.hibernate.criterion.Order
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Controller
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import javax.persistence.EntityManager
import org.springframework.data.jpa.domain.Specifications.where
import javax.persistence.criteria.CriteriaBuilder


@Controller
@Transactional
open class StoreProductController(val sessionRepository: SessionRepository,
                                  val productRepo: StoreProductRepo,
                                  val productSubTypeRepo: ProductSubTypeRepo,
                                  val productTypeRepo: ProductTypeRepo,
                                  val storeRepo: StoreRepo,
                                  val priceRepo: PriceRepo,
                                  val storeProductRepo: StoreProductRepo,
                                  val entityManager: EntityManager) {
    @RequestMapping("/createStoreProduct")
    @ResponseBody
    open fun createProuctType(@CookieValue(value = "projectSessionId", defaultValue = "0") sessionId: Long,
                              @RequestParam(value = "name", required = true, defaultValue = "") name: String,
                              @RequestParam(value = "description", required = true, defaultValue = "") description: String,
                              @RequestParam(value = "type", required = true, defaultValue = "") type: Long,
                              @RequestParam(value = "price", required = true, defaultValue = "") price: Double,
                              @RequestParam(value = "subType", required = true, defaultValue = "") subType: Long): Any {

        val session = sessionRepository.findOne(sessionId);

        if (PermisionChecks.storeProductManagement(session)) {
            var storeProduct = StoreProduct(name, session.user.store, productTypeRepo.findOne(type), productSubTypeRepo.findOne(subType), session.user)
            try {
                storeProduct = storeProductRepo.save(storeProduct)
                priceRepo.save(Price(price, storeProduct))
                storeProduct.currentPrice = price


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
                              @PathVariable("index") index: Int): Any {
        val session = sessionRepository.findOne(sessionId);
        if (PermisionChecks.storeProductManagement(session)) {
            try {

                return storeProductRepo.getProductsForStoreAdmin(session.user.store, constructPageSpecification(index, 10))
            } catch (e: Exception) {
                e.printStackTrace();
                return JsonMessage(JsonReturnCodes.ERROR)
            }

        } else {
            return JsonMessage(JsonReturnCodes.ERROR)
        }


    }


    @RequestMapping("/searchProducts/{index}")
    @ResponseBody
    open fun searchStoreProducts(@RequestParam("store") storeId: Long,
                                 @PathVariable("index") index: Int,
                                 @RequestParam("type", defaultValue = "0") typeId: Long,
                                 @RequestParam("sort", defaultValue = "0") sort: Int,
                                 @RequestParam("subType", defaultValue = "0") subTypeId: Long): Any {


        var specifications = where(StoreProductSpecification.storeSpec(storeRepo.findOne(storeId)))

        if (typeId > 0)
            specifications = specifications.and(StoreProductSpecification.typeSpec(productTypeRepo.findOne(typeId)))
        if (subTypeId > 0)
            specifications = specifications.and(StoreProductSpecification.subTypeSpec(productSubTypeRepo.findOne(subTypeId)))


        val builder = entityManager.criteriaBuilder
        val query = builder.createQuery(StoreProduct::class.java)
        val root = query.from(StoreProduct::class.java)



        return entityManager.
                createQuery(query.where(specifications.toPredicate(root, query, builder))
                        .orderBy(builder.asc(root.get(
                                if (sort == 0)
                                    StoreProduct_.name
                                else
                                    StoreProduct_.currentPrice))
                        ).select(root)).setFirstResult(index*10).setMaxResults(10).resultList
    }


    @RequestMapping("/changePrice")
    @ResponseBody
    open fun changePrice(@CookieValue(value = "projectSessionId", defaultValue = "0") sessionId: Long,
                         @RequestParam(value = "id", required = true, defaultValue = "") id: Long,
                         @RequestParam(value = "price", required = true, defaultValue = "") price: Double): Any {
        val session = sessionRepository.findOne(sessionId)
        val product = storeProductRepo.findOne(id)

        if (product != null && PermisionChecks.storeProductManagement(session) && PermisionChecks.ownProduct(session, product)) {
            try {
                priceRepo.save(Price(price, product))
                product.currentPrice = price
                storeProductRepo.save(product)
                return JsonMessage(JsonReturnCodes.Ok)
            } catch (e: Exception) {
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