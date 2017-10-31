package com.technonet.Repository;

import com.technonet.model.InfoRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by vakhtanggelashvili on 5/15/17.
 */
@Transactional
public interface InfoRecordRepo extends JpaRepository<InfoRecord, Long> {
}
