package com.technonet.ratingApi;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kaxge on 8/2/2017.
 */
@Entity

@Table(name = "RatingSoft")
public class RatingSoft {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ratingId")
    @JsonIgnore
    private long id;

    @Column
    private int rating;

    @Column
    private String code;

    @Column
    private Date date;

    public RatingSoft(){

    }
    public RatingSoft(int rating,String code){
        this.rating = rating;
        this.code = code;
        this.date = new Date();
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
