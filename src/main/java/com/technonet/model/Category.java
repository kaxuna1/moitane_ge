package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.technonet.staticData.Variables;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by kakha on 3/7/2017.
 */
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "categoryId")
    private long id;

    @Column
    private String name;

    @Column
    private String uuid;

    @Column
    private boolean active;

    @Column
    private Date date;

    @Column
    private boolean visible;

    @Column
    private String logo;

    @Column
    private String color;

    @Column
    private String description;

    @Column
    private String descriptionColor;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserCategoryJoin> userCategoryJoins;

    public int lang=1;

    @Column
    private Integer place;



    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "CATEGORY_DOCTYPE")
    private List<DocType> docTypes;


    public Category(String name) {
        this.name = name;
        uuid= UUID.randomUUID().toString();
        docTypes=new ArrayList<>();
        this.active=true;
        this.date=new Date();
        this.visible=false;
        this.userCategoryJoins=new ArrayList<>();
        this.color="";
        this.description="";
        this.descriptionColor="000000";
    }
    public Category(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return Variables.stringsMap.get(Variables.myThreadLocal.get()).get(this.name);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public List<DocType> getDocTypes() {
        return docTypes;
    }

    public void setDocTypes(List<DocType> docTypes) {
        this.docTypes = docTypes;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }


    public List<UserCategoryJoin> getUserCategoryJoins() {
        return userCategoryJoins;
    }

    public void setUserCategoryJoins(List<UserCategoryJoin> userCategoryJoins) {
        this.userCategoryJoins = userCategoryJoins;
    }

    public String getNameOriginal() {
        return name;
    }

    public Category setLang(int lang){
        this.lang=lang;
        return this;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionColor() {
        return descriptionColor;
    }

    public void setDescriptionColor(String descriptionColor) {
        this.descriptionColor = descriptionColor;
    }


    public Integer getPlace() {
        return place;
    }

    public void setPlace(Integer place) {
        this.place = place;
    }
}
