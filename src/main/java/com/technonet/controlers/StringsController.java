package com.technonet.controlers;

import com.technonet.Enums.Languages;
import com.technonet.Repository.SessionRepository;
import com.technonet.Repository.SysStringRepo;
import com.technonet.Repository.SysStringTranslationRepo;
import com.technonet.model.IdNameData;
import com.technonet.model.Session;
import com.technonet.model.SysString;
import com.technonet.model.SysStringTranslations;
import com.technonet.staticData.PermisionChecks;
import com.technonet.staticData.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * Created by vakhtanggelashvili on 3/26/17.
 */
@Controller
public class StringsController {
    @RequestMapping("createstring")
    @ResponseBody
    public boolean createString(@CookieValue("projectSessionId") long sessionId,
                                @RequestParam(value = "name", required = true, defaultValue = "0") String name,
                                @RequestParam(value = "value", required = true, defaultValue = "0") String value) {
        Session session = sessionRepository.findOne(sessionId);
        if (PermisionChecks.isAdmin(session)) {
            if (sysStringRepo.findByNameAndActive(name, true).size() > 0) {
                return false;
            }
            sysStringRepo.save(new SysString(value, name));
            for (int i=0;i<Languages.values().length;i++){
                Variables.stringsMap.get(Languages.values()[i].getCODE()).put(name,value);
            }
            return true;
        } else {
            return false;
        }


    }

    @RequestMapping("strings/{page}")
    @ResponseBody
    public Page<SysString> getStrings(@CookieValue("projectSessionId") long sessionId, @PathVariable("page") int page) {
        return sysStringRepo.findByActiveOrderByNameAsc(true, constructPageSpecification(page));
    }

    @RequestMapping("strings")
    @ResponseBody
    public Map<String, String> getStringsMap(@CookieValue(value = "lang", defaultValue = "1") int lang) {
        Variables.myThreadLocal.set(lang);
        return Variables.stringsMap.get(lang);
    }

    @RequestMapping("/translationsfor/{uuid}")
    @ResponseBody
    public List<SysStringTranslations> translationsFor(@CookieValue("projectSessionId") long sessionId,
                                                       @PathVariable("uuid") String uuid) {
        return sysStringTranslationRepo.findByActiveAndUuid(true, uuid);
    }

    @RequestMapping("/langsnotinstring/{uuid}")
    @ResponseBody
    public List<IdNameData> getLangsAddableToSysString(@CookieValue("projectSessionId") long sessionId,
                                                       @PathVariable("uuid") String uuid) {
        List<SysStringTranslations> translations = this.translationsFor(sessionId, uuid);
        return new UsersController().getLanguages().stream().filter(idNameData -> idNameData.getId() != Languages.English.getCODE() && translations.stream().noneMatch(sysStringTranslations -> sysStringTranslations.getLang() == idNameData.getId())).collect(Collectors.toList());
    }
    @RequestMapping("/addtranslation")
    @ResponseBody
    public boolean addTranslationToString(@CookieValue("projectSessionId") long sessionId,
                                          @RequestParam(value = "uuid", defaultValue = "") String uuid,
                                          @RequestParam(value = "name", defaultValue = "") String name,
                                          @RequestParam(value = "value", defaultValue = "") String value,
                                          @RequestParam(value = "lang", defaultValue = "0") int lang){
        Variables.myThreadLocal.set(lang);

        if(uuid.isEmpty()||value.isEmpty()||lang==0||getLangsAddableToSysString(sessionId,uuid).stream().noneMatch(idNameData -> idNameData.getId()==lang)){
            return false;
        }
        SysStringTranslations sysStringTranslations= new SysStringTranslations();
        sysStringTranslations.setActive(true);
        sysStringTranslations.setLang(lang);
        sysStringTranslations.setUuid(uuid);
        sysStringTranslations.setValue(value);
        try{
            sysStringTranslationRepo.save(sysStringTranslations);
            Variables.stringsMap.get(lang).put(name,value);

        }catch (Exception e){
            e.printStackTrace();
            return false;
        }

        return true;
    }


    private Pageable constructPageSpecification(int pageIndex) {
        return new PageRequest(pageIndex, 100);
    }


    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SysStringRepo sysStringRepo;
    @Autowired
    private SysStringTranslationRepo sysStringTranslationRepo;
}
