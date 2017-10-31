package com.technonet.model;

import com.technonet.Enums.JsonReturnCodes;

/**
 * Created by vakhtanggelashvili on 11/3/15.
 */
public class JsonMessage {
    public JsonMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
    public JsonMessage(int code, String message,String message2) {
        this.code = code;
        this.message = message;
        this.message2 = message2;
    }
    public JsonMessage(JsonReturnCodes code) {
        this.code = code.getCODE();
        this.message = code.name();
    }
    public JsonMessage(){

    }

    private int code;
    private String message;
    private String message2;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage2() {
        return message2;
    }

    public void setMessage2(String message2) {
        this.message2 = message2;
    }
}
