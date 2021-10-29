package com.nextsaa.gstspiraea.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class DirectorDetails {

    @Id
    @Column(name = "directordetailsid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long directordetailsid;
    private String directorName;
    private String directordin;
    private String directorfatherName;
    private String adharnumber;
    private String adharphoto;
    private String resident_address;
    private String photo;
}
