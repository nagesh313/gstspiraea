package com.nextsaa.gstspiraea.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Director {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String directorName;
    private String directorDin;
    private String directorFatherName;
    private String directorAadharNo;
    private String directorAadharPhotoCopy;
    private String directorResidentialAddress;
    private String directorPhoto;
}
