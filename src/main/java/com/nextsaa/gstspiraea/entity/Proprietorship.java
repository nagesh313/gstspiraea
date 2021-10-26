package com.nextsaa.gstspiraea.entity;


import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "proprietorship")
@Data
public class Proprietorship {

    @Id
    @Column(name = "proprietorshipid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proprietorshipid;

    @Column(name = "personName", nullable = false)
    private String personName;

    @Column(name = "legalbusinessName")
    private String legalbusinessName;

    @Column(name = "tradeName", nullable = false)
    private String tradeName;

    @Column(name = "mobile", nullable = false)
    private String mobile;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "pannumber", nullable = false)
    private String pannumber;

    @Column(name = "panphoto", nullable = false)
    private String panphoto;

    @Column(name = "composition")
    private String composition;

    @Column(name = "commencementDate")
    private String commencementDate;

    @Column(name = "principleplace")
    private String principleplace;

    @Column(name = "pricipleelectricityphoto")
    private String pricipleelectricityphoto;

    @Column(name = "priciplerentphoto")
    private String priciplerentphoto;

    @Column(name = "priciplenocphoto")
    private String priciplenocphoto;

    @Column(name = "additionalplace")
    private String additionalplace;

    @Column(name = "additionalelectricityphoto")
    private String additionalelectricityphoto;

    @Column(name = "additionalrentphoto")
    private String additionalrentphoto;

    @Column(name = "additionalnocphoto")
    private String additionalnocphoto;

    @Column(name = "propfatherName")
    private String propfatherName;

    @Column(name = "propadharnumber")
    private String propadharnumber;

    @Column(name = "propadharphoto")
    private String propadharphoto;

    @Column(name = "resident_address")
    private String resident_address;

    @Column(name = "photo")
    private String photo;

    @Column(name = "authsignname")
    private String authsignname;

    @Column(name = "signfathername")
    private String signfathername;

    @Column(name = "signadharnumber")
    private String signadharnumber;

    @Column(name = "signadharphoto")
    private String signadharphoto;

    @Column(name = "residentsignaddress")
    private String residentsignaddress;

    @Column(name = "signphoto")
    private String signphoto;

    @Column(name = "businessactivity")
    private String businessactivity;

    @Column(name = "hsn1")
    private String hsn1;

    @Column(name = "hsn2")
    private String hsn2;

    @Column(name = "hsn3")
    private String hsn3;

    @Column(name = "hsn4")
    private String hsn4;

    @Column(name = "hsn5")
    private String hsn5;

    @Column(name = "accountname")
    private String accountname;

    @Column(name = "accountnumber")
    private String accountnumber;

    @Column(name = "ifsc")
    private String ifsc;

    @Column(name = "branchname")
    private String branchname;

    @Column(name = "branchcode")
    private String branchcode;

    @Column(name = "cancelcheqphoto")
    private String cancelcheqphoto;

    @Column(name = "tradelicensenumber")
    private String tradelicensenumber;

    @Column(name = "tradelicensephoto")
    private String tradelicensephoto;

    @Column(name = "isactive")
    private boolean isActive;

    @Column(name = "createdon", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn = LocalDateTime.now();

    @Column(name = "createdby")
    private String createdBy;

    @Column(name = "modifiedon")
    @CreationTimestamp
    private LocalDateTime modifiedOn = LocalDateTime.now();

    @Column(name = "modifiedby")
    private String modifiedBy;

    @Column(name = "status")
    private String status;

    @Column(name = "remark")
    private String remark;

    private boolean trading;
    private boolean manufacture;
    private boolean service;

}
