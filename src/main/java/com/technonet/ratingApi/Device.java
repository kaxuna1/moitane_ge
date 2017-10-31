package com.technonet.ratingApi;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by kaxge on 8/3/2017.
 */
@Entity
@Table(name = "Device")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "deviceId")
    @JsonIgnore
    private long id;

    @Column
    private String code;
}
