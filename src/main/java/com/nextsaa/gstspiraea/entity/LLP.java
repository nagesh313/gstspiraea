package com.nextsaa.gstspiraea.entity;

import java.time.LocalDateTime;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "llp")
@Data
public class LLP {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String llpid;

    @Column(name = "firmName", nullable = false)
    private String firmName;

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
    private Date commencementDate;

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
    private LocalDateTime createdOn;

    @Column(name = "createdby", nullable = false)
    private String createdBy;

    @Column(name = "modifiedon")
    @CreationTimestamp
    private LocalDateTime modifiedOn;

    @Column(name = "modifiedby")
    private String modifiedBy;

    @Column(name = "status")
    private String status;
    private String gstDocument;
    @Column(name = "remark")
    private String remark;
    private boolean trading;
    private boolean manufacture;
    private boolean service;
    private String razorpayOrder;
    @OneToOne
    private PaymentPlanLocationDetails paymentPlanLocationDetails;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Partner> partnerList;
    private String certificateOfIncorportation;
    private String partnershipDeed;
    @OneToMany(cascade = CascadeType.ALL)
    private List<GSTCertificatesInOtherStates> gstCertificatesInOtherStates;
}
