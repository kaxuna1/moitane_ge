package com.technonet.model;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ProductType")
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "productTypeId")
    private long id;


    @Column
    private String name;

    @Column
    private Date createDate;

    @Column
    private boolean active;

    @OneToMany(mappedBy = "productType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductSubType> productSubTypes;


    public ProductType(String name) {
        this.name = name;
        this.active = true;
        this.createDate = new Date();
        this.productSubTypes = new ArrayList<>();
    }
    public ProductType(){

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

    public List<ProductSubType> getProductSubTypes() {
        return productSubTypes;
    }

    public void setProductSubTypes(List<ProductSubType> productSubTypes) {
        this.productSubTypes = productSubTypes;
    }
}
