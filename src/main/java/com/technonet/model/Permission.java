package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kakha on 2/28/2017.
 */
@Entity
@Table(name = "permission")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "permissionId")
    private long id;

    @Column
    @NotNull
    private String name;

    @Column
    @NotNull
    private String code;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "USER_PERMISSION")
    private List<User> users;


    public Permission() {
    }

    public Permission(String name,String code) {
        this.name=name;
        this.code=code;
        users = new ArrayList<>();
    }

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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
