package com.technonet.Repository;

import com.technonet.model.Store;
import com.technonet.model.StoreProduct;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreProductRepo extends JpaRepository<StoreProduct,Long> {


    @Query("select sp from StoreProduct sp where sp.active = true and sp.store = :store")
    Page<StoreProduct> getProductsForStoreAdmin(@Param("store") Store store, Pageable constructPageSpecification);
}
