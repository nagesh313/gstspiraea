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
@Data
public class UserDetails {

    @Id
    @Column(name = "userid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "middlename")
    private String middleName;

    @Column(name = "lastname")
    private String lastName;

    @Column(name = "dateofbirth")
    private Date dateOfBirth;

    @Column(name = "useremail", nullable = false)
    private String userEmail;

    @Column(name = "mobile", nullable = false)
    private Double mobile;

    @Column(name = "gender")
    private String gender;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "isactive")
    private int isActive;

    @Column(name = "isarchived")
    private int isArchived;

    @Column(name = "isemailVerified")
    private int isEmailVerified;

    private String loginUserName;

    @Column(name = "loginpassword")
    private String loginPassword;

    @Column(name = "ismobileverified")
    private int isMobileVerified;

    @Column(name = "loginattempt")
    private int loginAttempt;

    @Column(name = "custphoto")
    private String custPhoto;

    @Column(name = "createdon", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(name = "createdby", nullable = false)
    private String createdBy;

    @Column(name = "modifiedon")
    @CreationTimestamp
    private LocalDateTime modifiedOn;

    @Column(name = "modifiedby")
    private String modifiedBy;

    @Column(name = "lastlogindt")
    private Date lastLoginDate;
    private String businessName;
    private String vendorType;

}
