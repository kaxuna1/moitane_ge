package com.technonet.Repository;

import com.technonet.model.ProductType;
import kotlin.Unit;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductTypeRepo extends JpaRepository<ProductType,Long> {

    List<ProductType> findByActive(boolean active);


    List<ProductType> findByName( String name);

/*
    @Query(value = "select * FROM ",nativeQuery = true)
    List<ProductType> testSelect(@Param("activVal") boolean activVal);*/

}