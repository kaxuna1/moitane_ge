package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.joda.time.Duration;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by vakhtanggelashvili on 3/14/17.
 */
@Entity

@Table(name = "BookedTime")
public class BookedTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bookedTimeId")
    @JsonIgnore
    private long id;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "studentId")
    @JsonIgnore
    private User student;

    @ManyToOne
    @JoinColumn(name = "orderId")
    @JsonIgnore
    private Order order;

    @ManyToOne
    @JoinColumn(name = "userCategoryJoinId")
    @JsonIgnore
    private UserCategoryJoin userCategoryJoin;


    @Column
    @JsonIgnore
    private boolean active;


    public BookedTime(Date startDate, Date endDate, User student, UserCategoryJoin userCategoryJoin, Order order) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.student = student;
        this.userCategoryJoin = userCategoryJoin;
        this.order = order;
        this.active=true;
    }

    public BookedTime() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public UserCategoryJoin getUserCategoryJoin() {
        return userCategoryJoin;
    }

    public void setUserCategoryJoin(UserCategoryJoin userCategoryJoin) {
        this.userCategoryJoin = userCategoryJoin;
    }

    public String getCategoryName() {
        return this.userCategoryJoin.getCategory().getName();
    }

    public long getStudentId() {
        return this.student.getId();
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public long getDurationInMinutes(){
        return this.getDuration().getStandardMinutes();
    }
    @JsonIgnore
    public Duration getDuration(){
        return new Duration(this.startDate.getTime(),this.endDate.getTime());
    }
}
