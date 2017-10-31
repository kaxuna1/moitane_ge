package com.technonet.Repository;


import com.technonet.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    List<User> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    @Query("SELECT u FROM User u WHERE u.username LIKE CONCAT('%',:username,'%') OR u.email LIKE CONCAT('%',:email,'%') OR u.address LIKE CONCAT('%',:address,'%')")
    Page<Object> findByUsernameOrEmailOrAddress(@Param("username") String username, @Param("email") String email, @Param("address") String address, Pageable pageable);

    List<User> findByFacebookIdAndActive(String facebookId, boolean active);

    List<User> findByGoogleIdAndActive(String googleId, boolean active);

    List<User> findByEmailAndActive(String email, boolean active);

    Page<User> findByActive(boolean b, Pageable pageable);
}
