package com.technonet.Enums;

/**
 * Created by vakhtanggelashvili on 5/15/17.
 */
public enum InfoRecordTypes {
    academic(0),
    employment(1),
    succeed(2),
    skills(3),
    attachment(4);

    private int CODE;

    InfoRecordTypes(int i) {
        this.CODE = i;
    }

    public int getCODE() {
        return CODE;
    }
}
