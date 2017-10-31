package com.technonet.Repository;

import com.technonet.model.Document;
import com.technonet.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kakha on 3/6/2017.
 */
@Transactional
public interface DocumentsRepo extends JpaRepository<Document,Long> {
    Page<Document> findByUserAndActiveOrderByDateDesc(User user, boolean active, Pageable pageable);
}
