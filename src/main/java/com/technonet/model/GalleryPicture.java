package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by kakha on 3/10/2017.
 */
@Entity
@Table(name = "GalleryPicture")
public class GalleryPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "galleryPictureId")
    private long id;
    @Column
    private String name;
    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;
    @Column
    private String extension;
    @Column
    private Date date;
    @Column
    private boolean active;

    public GalleryPicture(String name, User user, String extension) {
        this.name = name;
        this.user = user;
        this.extension = extension;
        this.date=new Date();
        this.active=true;
    }

    public GalleryPicture(){}

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
