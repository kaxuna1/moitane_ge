package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.Interval;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.ToDoubleFunction;
import java.util.stream.DoubleStream;

/**
 * Created by kakha on 3/15/2017.
 */
@Entity
@Table(name = "orders")
public class Order {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "orderId")
    @JsonIgnore
    private long id;

    @Column
    private String uuid;

    @Column
    private Date createDate;

    @Column
    @JsonIgnore
    private Date lastModifyDate;

    @Column
    @JsonIgnore
    private Date confirmDate;

    @Column
    private boolean confirmed;

    @Column
    @JsonIgnore
    private boolean refunded;

    @Column
    @JsonIgnore
    private boolean active;

    @Column
    private String comment;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookedTime> bookedTimes;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments;

    @Column
    private float price;

    private int lang;

    public Order(User user) {
        this.user = user;
        this.active = true;
        this.confirmed = false;
        this.refunded = false;
        this.bookedTimes = new ArrayList<>();
        this.createDate = new Date();
        this.lastModifyDate = new Date();
        this.uuid = UUID.randomUUID().toString();
        this.payments = new ArrayList<>();
        this.comment  = "";
    }

    public Order() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getLastModifyDate() {
        return lastModifyDate;
    }

    public void setLastModifyDate(Date lastModifyDate) {
        this.lastModifyDate = lastModifyDate;
    }

    public Date getConfirmDate() {
        return confirmDate;
    }

    public void setConfirmDate(Date confirmDate) {
        this.confirmDate = confirmDate;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }

    public boolean isRefunded() {
        return refunded;
    }

    public void setRefunded(boolean refunded) {
        this.refunded = refunded;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<BookedTime> getBookedTimes() {
        bookedTimes.forEach(bookedTime -> bookedTime.getUserCategoryJoin().getCategory().setLang(lang));
        return bookedTimes;
    }

    public void setBookedTimes(List<BookedTime> bookedTimes) {
        this.bookedTimes = bookedTimes;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }
    public float getOrderPrice(){
        return price;
    }
    @JsonIgnore
    public float getPayementsMade(){
        return (float)this.payments.stream()
                .filter(payment -> payment.isActive()&&payment
                        .isConfirmed()).mapToDouble(value ->
                        (double)value.getPrice()).sum();
    }

    public void confirm() {
        this.confirmDate=new Date();
        this.confirmed=true;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @JsonIgnore
    public User getTeacher() {
        return bookedTimes.size()>0?bookedTimes.get(0).getUserCategoryJoin().getUser():null;
    }
    public String getCategoryName(){

        return bookedTimes.size()>0?bookedTimes.get(0).getUserCategoryJoin().getCategory().setLang(lang).getName():"";
    }
    public String getTeacherName(){
        return this.getTeacher().getNameSurname();
    }
    public String getStudentName(){
        return this.user.getNameSurname();
    }
    public long getStudentId(){
        return user.getId();
    }
    public long getTeacherId(){
        return getTeacher().getId();
    }
    public boolean isCanBePaid(){
        Date date=new Date();
        long nowLong= date.getTime();
        Date createDate = new Date(new DateTime(this.createDate).getMillis());
        long cLong= createDate.getTime();
        long dif=nowLong-cLong;


        return (dif<1000*60*60)&&!this.confirmed;
    }

    public int getLang() {
        return lang;
    }

    public void setLang(int lang) {
        this.lang = lang;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
