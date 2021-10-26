package com.nextsaa.gstspiraea.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProprietorshipDTO {

    private Long proprietorshipid;

    private String personName;

    private String legalbusinessName;

    private String tradeName;

    private String mobile;

    private String email;

    private String pannumber;

    private String panphoto;

    private String composition;

    private String commencementDate;

    private String principleplace;

    private String pricipleelectricityphoto;

    private String priciplerentphoto;

    private String priciplenocphoto;

    private String additionalplace;

    private String additionalelectricityphoto;

    private String additionalrentphoto;

    private String additionalnocphoto;

    private String propfatherName;

    private String propadharnumber;

    private String propadharphoto;

    private String resident_address;

    private String photo;

    private String authsignname;

    private String signfathername;

    private String signadharnumber;

    private String signadharphoto;

    private String residentsignaddress;

    private String signphoto;

    private String businessactivity;

    private String hsn1;

    private String hsn2;

    private String hsn3;

    private String hsn4;

    private String hsn5;

    private String accountname;

    private String accountnumber;

    private String ifsc;

    private String branchname;

    private String branchcode;

    private String cancelcheqphoto;

    private String tradelicensenumber;

    private String tradelicensephoto;

    private boolean isActive;

    private LocalDateTime createdOn;

    private String createdBy;

    private LocalDateTime modifiedOn;

    private String modifiedBy;

    private String status;

    private String remark;
    private boolean trading;
    private boolean manufacture;
    private boolean service;

}
