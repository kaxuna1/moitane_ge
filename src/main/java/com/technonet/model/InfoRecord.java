package com.technonet.model;

import javax.persistence.*;

/**
 * Created by vakhtanggelashvili on 5/15/17.
 */
@Entity
@Table(name = "InfoRecord")
public class InfoRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "infoRecordId")
    private long id;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private int type;

    private String value;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
