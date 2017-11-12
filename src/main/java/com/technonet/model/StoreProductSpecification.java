package com.technonet.model;

import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.domain.Specification;

public class StoreProductSpecification {
    public static Specification<StoreProduct> typeSpec(ProductType productType) {
        return (root, query, cb) -> {

            return cb.equal(root.get(StoreProduct_.productType),productType);
        };
    }
    public static Specification<StoreProduct> subTypeSpec(ProductSubType productSubType) {
        return (root, query, cb) -> {

            return cb.equal(root.get(StoreProduct_.productSubType),productSubType);
        };
    }
    public static Specification<StoreProduct> storeSpec(Store store) {
        return (root, query, cb) -> {

            return cb.equal(root.get(StoreProduct_.store),store);
        };
    }

  /*  public static Specification<StoreProduct> orderByPrice() {
        return (root, query, cb) -> {
            return cb.;
        };
    }*/
}
