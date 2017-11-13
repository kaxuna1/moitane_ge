package com.technonet.controlers

import com.technonet.Enums.JsonReturnCodes
import com.technonet.Repository.*
import com.technonet.model.*
import com.technonet.staticData.PermisionChecks
import com.technonet.staticData.Variables
import org.apache.poi.hssf.usermodel.HSSFWorkbook
import org.hibernate.criterion.Order
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Controller
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import javax.persistence.EntityManager
import org.springframework.data.jpa.domain.Specifications.where
import java.io.FileInputStream
import javax.persistence.criteria.CriteriaBuilder
import org.apache.poi.hssf.usermodel.HSSFSheet
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.net.URL
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*
import javax.imageio.ImageIO


@Controller
@Transactional
open class StoreProductController(val sessionRepository: SessionRepository,
                                  val productRepo: StoreProductRepo,
                                  val productSubTypeRepo: ProductSubTypeRepo,
                                  val productTypeRepo: ProductTypeRepo,
                                  val storeRepo: StoreRepo,
                                  val priceRepo: PriceRepo,
                                  val storeProductRepo: StoreProductRepo,
                                  val galleryPictureRepo: GalleryPictureRepo,
                                  val entityManager: EntityManager) {
    @RequestMapping("/createStoreProduct")
    @ResponseBody
    open fun createProuctType(@CookieValue(value = "projectSessionId", defaultValue = "0") sessionId: Long,
                              @RequestParam(value = "name", required = true, defaultValue = "") name: String,
                              @RequestParam(value = "code", required = true, defaultValue = "") code: String,
                              @RequestParam(value = "description", required = true, defaultValue = "") description: String,
                              @RequestParam(value = "type", required = true, defaultValue = "") type: Long,
                              @RequestParam(value = "price", required = true, defaultValue = "") price: Double,
                              @RequestParam(value = "subType", required = true, defaultValue = "") subType: Long): Any {

        val session = sessionRepository.findOne(sessionId);

        if (PermisionChecks.storeProductManagement(session)) {
            var storeProduct = StoreProduct(name, session.user.store, productTypeRepo.findOne(type), productSubTypeRepo.findOne(subType), session.user)
            storeProduct.code = code
            try {
                storeProduct = storeProductRepo.save(storeProduct)
                priceRepo.save(Price(price, storeProduct))
                storeProduct.currentPrice = price
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
                              @RequestParam("search",defaultValue = "") search:String,
                              @PathVariable("index") index: Int): Any {
        val session = sessionRepository.findOne(sessionId);
        if (PermisionChecks.storeProductManagement(session)) {
            try {

                return storeProductRepo.getProductsForStoreAdmin(session.user.store,search, constructPageSpecification(index, 50))
            } catch (e: Exception) {
                e.printStackTrace()
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
                        ).select(root)).setFirstResult(index * 10).setMaxResults(10).resultList
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

    @RequestMapping("/import")
    @ResponseBody
    open fun import(): Any {


        var myxls = FileInputStream(Variables.appDir + "/k.xlsx")

        val wb = XSSFWorkbook(myxls)

        val sheet = wb.getSheetAt(0)       // first sheet


        var k = arrayListOf<String>()

        var store = storeRepo.findOne(1L)

        var i = 0

        var e = 0;

        var rows = sheet.forEach({ r ->

            var code = r.getCell(0).stringCellValue
            var name = r.getCell(1).stringCellValue
            var price = r.getCell(2).numericCellValue
            var count = r.getCell(3).numericCellValue
            var desc = r.getCell(4).stringCellValue
            var type = r.getCell(5).stringCellValue
            var link = r.getCell(6).stringCellValue

            var productType: ProductType?

            var productTypes = productTypeRepo.findByName(type)
            if (productTypes.size == 0) {
                productType = ProductType(type)
                productType = productTypeRepo.save(productType)
            } else {
                productType = productTypes.first()
            }


            var product = StoreProduct(name, store, productType, null, null)
            product.code = code
            product.description = desc
            product = storeProductRepo.save(product)
            priceRepo.save(Price(price, product))
            product.currentPrice = price
            storeProductRepo.save(product)

            link = link.replace(" ","%20")

            var url = URL("http://${link}")


            try{
                var bufferedImage = ImageIO.read(url)
                val uuid = UUID.randomUUID()

                val w = bufferedImage.width
                val h = bufferedImage.height
                if (w > 700) {
                    val newWidth = 700
                    val scale = w.toFloat() / newWidth.toFloat()
                    val newHeight = h / scale
                    bufferedImage = Variables.resize(bufferedImage, newWidth, newHeight.toInt())
                }
                val newWidth = 100
                val scale = w.toFloat() / newWidth.toFloat()
                val newHeight = h / scale
                val iconImg = Variables.resize(bufferedImage, newWidth, newHeight.toInt())

                val baosIcon = ByteArrayOutputStream()
                ImageIO.write(iconImg, "png", baosIcon)
                val isIcon = ByteArrayInputStream(baosIcon.toByteArray())


                val baos = ByteArrayOutputStream()
                ImageIO.write(bufferedImage, "png", baos)
                val `is` = ByteArrayInputStream(baos.toByteArray())


                Files.copy(`is`, Paths.get(Variables.appDir + "/images/galleryPics", uuid.toString()))
                Files.copy(isIcon, Paths.get(Variables.appDir + "/images/galleryPicLogos", uuid.toString()))
                galleryPictureRepo.save(GalleryPicture(uuid.toString(), null, product, "image/jpeg"))
            }catch (ex:Exception){
                ex.printStackTrace()
            }


        })




        return k
    }


    private fun constructPageSpecification(pageIndex: Int, size: Int): Pageable {
        return PageRequest(pageIndex, size)
    }
}