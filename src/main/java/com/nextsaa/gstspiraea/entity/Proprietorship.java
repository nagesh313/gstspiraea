package com.nextsaa.gstspiraea.entity;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "proprietorship")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Proprietorship {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String proprietorshipid;

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

    private String propadharphotoFront;
    private String propadharphotoBack;
    @Column(name = "resident_address")
    private String resident_address;

    @Column(name = "photo")
    private String photo;

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

    @Column(name = "branchname")
    private String branchname;

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
    private String status = "DRAFT";
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
    private List<GSTCertificatesInOtherStates> gstCertificatesInOtherStates;

}
