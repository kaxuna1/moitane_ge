package com.technonet.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ProductSubType")
public class ProductSubType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "productSubTypeId")
    private long id;


    @Column
    private String name;

    @Column
    private Date createDate;

    @Column
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "productTypeId")
    @JsonIgnore
    private ProductType productType;

    public ProductSubType(String name, ProductType productType) {
        this.name = name;
        this.productType = productType;
        this.active = true;
        this.createDate = new Date();
    }

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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }
}
