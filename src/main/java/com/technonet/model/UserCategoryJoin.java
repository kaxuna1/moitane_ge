package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by kaxa on 3/8/17.
 */
@Entity
@Table(name = "UserCategoryJoin")
public class UserCategoryJoin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "joinId")
    private long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @Column
    private boolean accepted;

    @Column
    private boolean declined;

    @Column
    private boolean active;


    private int views ;


    @JsonIgnore
    @OneToMany(mappedBy = "userCategoryJoin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookedTime> bookedTimes;

    @JsonIgnore
    @OneToMany(mappedBy = "userCategoryJoin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Rating> ratings;

    @Column
    private Date date;

    @Column
    private Date lastModifyDate;

    @OneToMany(mappedBy = "userCategoryJoin", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Schedule> schedules;


    @Column
    private int location;


    @Column
    private float price;

    @Column
    private int ratingNum=0;

    @Column
    private int ratingSum=0;

    @Column
    private int duration;

    @Column
    private String about;
    @Column
    private int exp;
    @Column
    private int education;
    @Column
    private boolean classType;


    public UserCategoryJoin(User user, Category categoryId, float price, int duration,int location) {
        this.user = user;
        this.category = categoryId;
        this.duration = duration;
        this.accepted = false;
        this.declined = false;
        this.date = new Date();
        this.lastModifyDate = new Date();
        this.active = true;
        this.schedules = new ArrayList<>();
        this.price = price;
        this.bookedTimes = new ArrayList<>();
        this.views = 400 + (int)(Math.random() * 800);
        this.ratings = new ArrayList<>();
        this.location = location;
        this.classType = false;

    }

    public UserCategoryJoin() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public boolean isDeclined() {
        return declined;
    }

    public void setDeclined(boolean declined) {
        this.declined = declined;
    }

    public void confirm() {
        this.accepted = true;
        this.lastModifyDate = new Date();
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public void decline() {
        this.declined = true;
        this.accepted = false;
        this.lastModifyDate = new Date();
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<Schedule> schedules) {
        this.schedules = schedules;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public List<BookedTime> getBookedTimes() {
        return bookedTimes;
    }

    public void setBookedTimes(List<BookedTime> bookedTimes) {
        this.bookedTimes = bookedTimes;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public long getCategoryId() {
        return this.category.getId();
    }

    public long getUserId() {
        return this.user.getId();
    }

    public String getUserName() {
        return this.user.getName();
    }

    public String getUserSurname() {
        return this.user.getSurname();
    }

    public String getCategoryName() {
        return this.category.getName();
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public int getRatingNum() {
        return ratingNum;
    }

    public void setRatingNum(int ratingNum) {
        this.ratingNum = ratingNum;
    }

    public int getRatingSum() {
        return ratingSum;
    }

    public int getRating(){
        if(ratingNum>0&&ratingSum>0){
            return ratingSum/ratingNum;
        }else{
            return 5;
        }
    }

    public void setRatingSum(int ratingSum) {
        this.ratingSum = ratingSum;
    }
    public void giveRating(int rating){
        ratingSum+=rating;
        ratingNum++;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public int getLocation() {
        return location;
    }

    public void setLocation(int location) {
        this.location = location;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public int getEducation() {
        return education;
    }

    public void setEducation(int education) {
        this.education = education;
    }

    public boolean isClassType() {
        return classType;
    }

    public void setClassType(boolean classType) {
        this.classType = classType;
    }
}
