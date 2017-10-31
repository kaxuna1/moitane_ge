package com.technonet.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

/**
 * Created by vakhtanggelashvili on 3/26/17.
 */
@Entity
@Table(name = "SysStrings")
public class SysString {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "stringId")
    private long id;

    @Column
    private String value;

    public SysString(String value, String name) {
        this.value = value;
        this.name = name;
        this.createDate = new Date();
        this.active = true;
        this.uuid = UUID.randomUUID().toString();
    }

    @Column
    private String name;

    @Column
    private String uuid;

    @Column
    private boolean active;

    @Column
    private Date createDate;

    public SysString() {
    }

    public SysString(String value, String name, String uuid) {
        this.value = value;
        this.name = name;
        this.uuid= uuid;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
