package com.technonet.Repository;

import com.technonet.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by kakha on 3/7/2017.
 */
@Transactional
public interface CategoryRepo extends JpaRepository<Category,Long> {
    Page<Category> findByActiveOrderByNameAsc(boolean active, Pageable pageable);

    List<Category> findByActiveAndVisible(boolean active,boolean visible);

    Page<Category> findByActiveAndVisibleOrderByPlaceAsc(boolean active, boolean visible, Pageable pageable);

    List<Category> findByActive(boolean active);
}
