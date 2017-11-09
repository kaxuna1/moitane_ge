package com.technonet.Repository;

import com.technonet.model.ProductSubType;
import com.technonet.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductSubTypeRepo extends JpaRepository<ProductSubType,Long> {



    Page<ProductSubType> findByProductTypeAndActive(ProductType productType, boolean active, Pageable constructPageSpecification);
}
