package com.nextsaa.gstspiraea.dto;

import lombok.Data;


import java.time.LocalDateTime;

import java.util.Date;

@Data
public class CompanyDetailsDTO {

    private Long companydetailsid;

    private String firmName;

    private String legalbusinessName;

    private String tradeName;

    private String mobile;

    private String email;

    private String pannumber;

    private String panphoto;

    private String composition;

    private Date commencementDate;

    private String principleplace;

    private String pricipleelectricityphoto;

    private String priciplerentphoto;

    private String priciplenocphoto;

    private String additionalplace;

    private String additionalelectricityphoto;

    private String additionalrentphoto;

    private String additionalnocphoto;

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

}
