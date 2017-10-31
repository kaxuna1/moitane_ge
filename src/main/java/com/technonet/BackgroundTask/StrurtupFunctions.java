package com.technonet.BackgroundTask;

import com.technonet.Enums.Languages;
import com.technonet.Repository.CategoryRepo;
import com.technonet.Repository.SysStringRepo;
import com.technonet.Repository.SysStringTranslationRepo;
import com.technonet.model.Category;
import com.technonet.model.SysString;
import com.technonet.model.SysStringTranslations;
import com.technonet.staticData.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * Created by vakhtanggelashvili on 4/6/17.
 */
@Component
public class StrurtupFunctions {


    @PostConstruct
    public void init() {
        List<SysString> sysStringList = sysStringRepo.findByActive(true);
        List<Category> categories = categoryRepo.findByActive(true);
        categories.forEach(c -> sysStringList.add(new SysString(c.getNameOriginal(), c.getNameOriginal(), c.getUuid())));


        Map<String, String> mainStringsUuidNameMap = sysStringList
                .stream().collect(Collectors.toMap(SysString::getUuid, SysString::getName));

        Map<String, String> mainStrings = sysStringList
                .stream().collect(Collectors.toMap(SysString::getName, SysString::getValue));
        Variables.stringsMap.put(1, mainStrings);
        for (int i = 0; i < Languages.values().length; i++) {
            Languages language = Languages.values()[i];
            int langCode = language.getCODE();
            List<SysStringTranslations> sysStringTranslationsList = sysStringTranslationRepo.findByActiveAndLang(true, langCode);
            Map<String, String> translatedMap = sysStringTranslationsList
                    .stream().collect(Collectors.toMap(SysStringTranslations::getUuid, SysStringTranslations::getValue));
            Map<String, String> translatedMapResult = new HashMap<>();
            sysStringList.forEach(sysString -> {
                if (translatedMap.containsKey(sysString.getUuid()))
                    translatedMapResult.put(sysString.getName(), translatedMap.get(sysString.getUuid()));
                else
                    translatedMapResult.put(sysString.getName(), sysString.getValue());
            });
            Variables.stringsMap.put(langCode, translatedMapResult);
        }
    }

    @Autowired
    private SysStringRepo sysStringRepo;
    @Autowired
    private SysStringTranslationRepo sysStringTranslationRepo;
    @Autowired
    private CategoryRepo categoryRepo;
}
