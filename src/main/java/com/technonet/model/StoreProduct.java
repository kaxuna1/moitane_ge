package com.technonet.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "StoreProducts")
public class StoreProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "storeProductId")
    private long id;

    @Column
    private String name;

    @Column
    private boolean active;

    @Column
    private Date createDate;

    @ManyToOne
    @JoinColumn(name = "storeId")
    private Store store;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "productTypeId")
    private ProductType productType;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "productSubTypeId")
    private ProductSubType productSubType;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private User createdBy;


    public StoreProduct(String name, Store store, ProductType productType, ProductSubType productSubType, User createdBy) {
        this.name = name;
        this.store = store;
        this.productType = productType;
        this.productSubType = productSubType;
        this.createdBy = createdBy;
        this.active = true;
        this.createDate = new Date();
    }
    public StoreProduct(){}

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

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public ProductSubType getProductSubType() {
        return productSubType;
    }

    public void setProductSubType(ProductSubType productSubType) {
        this.productSubType = productSubType;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getType(){
        return productType!= null?productType.getName():"";
    }

    public String getSubType(){
        return productSubType!= null?productSubType.getName():"";
    }
    public double getPrice(){
        return 5.5d;
    }
}
