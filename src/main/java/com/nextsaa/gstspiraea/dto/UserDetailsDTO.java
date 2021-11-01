package com.nextsaa.gstspiraea.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UserDetailsDTO {

    private Long userId;

    private String firstName;

    private String middleName;

    private String lastName;

    private Date dateOfBirth;

    private String userEmail;

    private Double mobile;

    private String gender;

    private String role;

    private int isActive;

    private int isArchived;

    private String loginUserName;

    private String loginPassword;

    private int isMobileVerified;

    private int isEmailVerified;

    private int loginAttempt;

    private String custPhoto;

    private LocalDateTime createdOn;

    private String createdBy;

    private LocalDateTime modifiedOn;

    private String modifiedBy;

    private Date lastLoginDate;
    private String businessName;
    private String vendorType;

}
