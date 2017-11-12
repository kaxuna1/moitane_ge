package com.technonet.model;


import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(StoreProduct.class)
public class StoreProduct_ {
    public static volatile SingularAttribute<StoreProduct, Long> id;
    public static volatile SingularAttribute<StoreProduct, String> name;
    public static volatile SingularAttribute<StoreProduct, Boolean> active;
    public static volatile SingularAttribute<StoreProduct, Store> store;
    public static volatile SingularAttribute<StoreProduct, ProductType> productType;
    public static volatile SingularAttribute<StoreProduct, ProductSubType> productSubType;
    public static volatile SingularAttribute<StoreProduct, Double> currentPrice;
}
