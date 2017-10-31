package com.technonet.Repository;

import com.technonet.model.SysString;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by vakhtanggelashvili on 3/26/17.
 */
@Transactional
public interface SysStringRepo extends JpaRepository<SysString,Long> {
    Page<SysString> findByActiveOrderByNameAsc(boolean active, Pageable pageable);

    List<SysString> findByNameAndActive(String name, boolean active);

    List<SysString> findByActive(boolean active);
}
