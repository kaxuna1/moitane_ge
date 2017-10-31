package com.technonet.Repository;

import com.technonet.model.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kaxa on 3/11/17.
 */
@Transactional
public interface ConfirmationTokenRepo extends JpaRepository<ConfirmationToken, Long> {
    ConfirmationToken findByToken(String token);
}
