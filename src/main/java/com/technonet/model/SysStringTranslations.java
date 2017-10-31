package com.technonet.model;

import com.technonet.Enums.Languages;

import javax.persistence.*;

/**
 * Created by vakhtanggelashvili on 3/26/17.
 */
@Entity
@Table(name = "SysStringTranslations")
public class SysStringTranslations {
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getLang() {
        return lang;
    }

    public String getLangName(){ return Languages.valueOf(lang).name();}

    public void setLang(int lang) {
        this.lang = lang;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public SysStringTranslations(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "stringTranslationId")
    private long id;

    @Column
    private int lang;

    @Column
    private String value;

    @Column
    private boolean active;

    @Column
    private String uuid;
}