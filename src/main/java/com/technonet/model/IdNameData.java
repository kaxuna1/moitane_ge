package com.technonet.model;

/**
 * Created by vakhtanggelashvili on 4/2/17.
 */
public class IdNameData {
    private int id;
    private String name;

    public IdNameData(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
