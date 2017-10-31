package com.technonet.ratingApi;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by kaxge on 8/2/2017.
 */

@Entity
@Table(name = "RatingName")
public class RatingName {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ratingNameId")
    @JsonIgnore
    private long id;

    @Column
    private String code;

    @Column
    private String name;


    public RatingName(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
