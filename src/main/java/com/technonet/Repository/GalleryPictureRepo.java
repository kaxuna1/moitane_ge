package com.technonet.Repository;

import com.technonet.model.GalleryPicture;
import com.technonet.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 3/10/17.
 */
@Transactional
public interface GalleryPictureRepo extends JpaRepository<GalleryPicture,Long>{
    Page<GalleryPicture> findByUserAndActiveOrderByDate(User user, boolean active, Pageable pageable);
}
