package com.technonet.Enums;

/**
 * Created by kaxa on 3/11/17.
 */
public enum  ConfirmationTypes {
    SMS(0),
    EMAIL(1);


    private int CODE;

    ConfirmationTypes(int i) {
        this.CODE = i;
    }

    public int getCODE() {
        return CODE;
    }
}
