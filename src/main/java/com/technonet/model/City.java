package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by kakha on 3/2/2017.
 */
@Entity
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cityId")
    private long id;

    @Column
    private String name;

    @ManyToOne
    @JoinColumn(name = "countryId")
    private Country country;

    @JsonIgnore
    @OneToMany(mappedBy = "city",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<User> users;

    public City(String name, Country country) {
        this.name = name;
        this.country = country;
        this.users=new ArrayList<>();
    }
    public City(){}

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

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
