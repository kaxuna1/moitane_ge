package com.technonet.Repository;

import com.technonet.model.Price;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepo extends JpaRepository<Price,Long> {
}
