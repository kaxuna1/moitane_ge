package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by kakha on 3/7/2017.
 */
@Entity
@Table(name = "docType")
public class DocType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "docTypeId")
    private long id;

    @Column
    private String name;

    @Column
    private String uuid;

    @Column
    private boolean active;

    @Column
    private Date date;
    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "CATEGORY_DOCTYPE")
    private List<Category> categories;

    @JsonIgnore
    @OneToMany(mappedBy = "docType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Document> documents;

    public DocType(String name) {
        this.name = name;
        this.uuid = UUID.randomUUID().toString();
        this.categories = new ArrayList<>();
        this.active = true;
        this.date = new Date();
        this.documents=new ArrayList<>();

    }
    public DocType(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
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

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
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

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}
