package com.nextsaa.gstspiraea.dto;

import com.nextsaa.gstspiraea.entity.Partner;
import com.nextsaa.gstspiraea.entity.PaymentPlanDetails;
import com.nextsaa.gstspiraea.entity.PaymentPlanLocationDetails;
import lombok.Data;

import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class LLPDTO {

    private Long llpid;

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
    private String gstDocument;
    private String remark;
    private boolean trading;
    private boolean manufacture;
    private boolean service;
    private String partnerName;
    private String partnerFatherName;
    private String partneradharnumber;
    private String partneradharphoto;
    private String residentialAddress;
    private String partnerPassportPhoto;
    private String razorpayOrder;
    private PaymentPlanLocationDetails paymentPlanLocationDetails;
    private List<Partner> partnerList;
}
