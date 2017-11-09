package com.technonet.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Store")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "storeId")
    private long id;

    @Column
    private String name;

    @Column
    private String logo;

    @Column
    private Date createDate;

    @Column
    private boolean active;

    public Store(String name) {
        this.name = name;
        this.active = true;
        this.createDate = new Date();
    }
    public Store(){}

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

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}