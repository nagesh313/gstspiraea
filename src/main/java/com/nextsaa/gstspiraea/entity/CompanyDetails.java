package com.nextsaa.gstspiraea.entity;

import java.time.LocalDateTime;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "companydetails")
@Data
public class CompanyDetails {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String companydetailsid;
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

    @Column(name = "createdon", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(name = "createdby", nullable = false)
    private String createdBy;

    @CreationTimestamp
    private LocalDateTime modifiedOn;

    @Column(name = "modifiedby")
    private String modifiedBy;

    @Column(name = "status")
    private String status;
    private String gstDocument;
    @Column(name = "remark")
    private String remark;
    private String razorpayOrder;
    @OneToOne
    private PaymentPlanLocationDetails paymentPlanLocationDetails;
    @OneToMany
    private List<Director> directorList;
    private String certificateOfIncorportation;
    private String additionalPOB;
    private String principalPOB;
}
