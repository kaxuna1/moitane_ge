package com.technonet.Repository;

import com.technonet.model.SysStringTranslations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by vakhtanggelashvili on 3/26/17.
 */
public interface SysStringTranslationRepo extends JpaRepository<SysStringTranslations,Long> {
    List<SysStringTranslations> findByActiveAndUuid(boolean active, String uuid);

    List<SysStringTranslations> findByActiveAndLang(boolean active, int langCode);
}