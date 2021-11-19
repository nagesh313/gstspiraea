package com.nextsaa.gstspiraea.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "proprietorship")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "isActive='true'")
public class Proprietorship {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String proprietorshipid;
    @Column(name = "personName")
    private String personName;
    @Column(name = "legalbusinessName")
    private String legalbusinessName;
    @Column(name = "tradeName")
    private String tradeName;
    @Column(name = "mobile")
    private String mobile;
    @Column(name = "email")
    private String email;
    private String pannumber;
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

    @Column(name = "propfatherName")
    private String propfatherName;

    @Column(name = "propadharnumber")
    private String propadharnumber;

    private String propadharphotoFront;
    private String propadharphotoBack;
    @Column(name = "resident_address")
    private String resident_address;

    @Column(name = "photo")
    private String photo;

    @Column(name = "hsn1")
    private int hsn1;

    @Column(name = "hsn2")
    private int hsn2;

    @Column(name = "hsn3")
    private int hsn3;

    @Column(name = "hsn4")
    private int hsn4;

    @Column(name = "hsn5")
    private int hsn5;

    private String accountnumber;
    private String ifsccode;
    @Column(name = "cancelcheqphoto")
    private String cancelcheqphoto;

    @Column(name = "tradelicensenumber")
    private String tradelicensenumber;

    @Column(name = "tradelicensephoto")
    private String tradelicensephoto;

    @Column(name = "isactive")
    private boolean isActive = true;

    @Column(name = "createdon")
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
    private String status = "DRAFT";
    private String gstDocument;
    @Column(name = "remark")
    private String remark;

    private boolean trading;
    private boolean manufacture;
    private boolean service;
    private String razorpayOrder;
    //    @OneToOne
//    private PaymentPlanLocationDetails paymentPlanLocationDetails;
    @OneToMany(cascade = CascadeType.ALL)
    private List<GSTCertificatesInOtherStates> gstCertificatesInOtherStates;
    private String paymentPlanDetailsId;
    private String location;
    private Double amount;
}
