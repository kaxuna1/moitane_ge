package com.technonet.Repository;

import com.technonet.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreRepo extends JpaRepository<Store,Long> {
    List<Store> findByActive(boolean active);
}
