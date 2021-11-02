package com.nextsaa.gstspiraea.entity;


import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class Partner {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;
    private String partnerName;
    private String partnerFatherName;
    private String partnerAadharNo;
    private String partnerAadharPhotoCopyFront;
    private String partnerAadharPhotoCopyBack;
    private String pannumber;
    private String pannumberCopy;
    private String partnerResidentialAddress;
    private String partnerPhoto;
    private String partnerMobile;
    private String partnerEmail;
    private boolean isAuthorisedSignatory;

    public boolean getIsAuthorisedSignatory() {
        return this.isAuthorisedSignatory;
    }

    public void setIsAuthorisedSignatory(boolean isAuthorisedSignatory) {
        this.isAuthorisedSignatory = isAuthorisedSignatory;
    }
}
