package com.nextsaa.gstspiraea.entity;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String partnerName;
    private String partnerFatherName;
    private String partnerAadharNo;
    private String partnerAadharPhotoCopyFront;
    private String partnerAadharPhotoCopyBack;
    private String partnerResidentialAddress;
    private String partnerPhoto;
}
