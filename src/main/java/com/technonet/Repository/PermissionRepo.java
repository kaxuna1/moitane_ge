package com.technonet.Repository;

import com.technonet.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by kakha on 2/28/2017.
 */
@Transactional
public interface PermissionRepo extends JpaRepository<Permission,Long> {
}
