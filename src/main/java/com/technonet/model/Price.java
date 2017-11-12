package com.technonet.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Prices")
public class Price {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "priceId")
    private long id;

    @Column
    private double price;

    @Column
    private boolean active;

    @Column
    private Date createDate;

    @Column
    private Date finishDate;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "storeProductId")
    private StoreProduct storeProduct;


    public Price(double price, StoreProduct storeProduct) {
        this.price = price;
        this.storeProduct = storeProduct;
        this.active = true;
        this.createDate = new Date();

    }
    public Price(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public StoreProduct getStoreProduct() {
        return storeProduct;
    }

    public void setStoreProduct(StoreProduct storeProduct) {
        this.storeProduct = storeProduct;
    }
}
