package com.nextsaa.gstspiraea.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @OneToOne(cascade = CascadeType.ALL)
    private EmailVerification emailVerification;

    private boolean isAuthorisedSignatory = false;

    public boolean getIsAuthorisedSignatory() {
        return this.isAuthorisedSignatory;
    }

    public void setIsAuthorisedSignatory(boolean isAuthorisedSignatory) {
        this.isAuthorisedSignatory = isAuthorisedSignatory;
    }
}
