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
@Table(name = "partnership")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "isActive='true'")
public class Partnership {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String partnershipid;

    @Column(name = "firmName")
    private String firmName;

    @Column(name = "legalbusinessName")
    private String legalbusinessName;

    @Column(name = "tradeName")
    private String tradeName;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "email")
    private String email;

    @Column(name = "pannumber")
    private String pannumber;

    @Column(name = "panphoto")
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
    private LocalDateTime createdOn;

    @Column(name = "createdby")
    private String createdBy;

    @Column(name = "modifiedon")
    @CreationTimestamp
    private LocalDateTime modifiedOn;

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
    @OneToMany(cascade = CascadeType.ALL)
    private List<Partner> partnerList;
    private String certificateOfIncorportation;
    private String partnershipDeed;
    private String declarationOfAuthorisedSignatory;
    @OneToMany(cascade = CascadeType.ALL)
    private List<GSTCertificatesInOtherStates> gstCertificatesInOtherStates;
    private String location;
    private String paymentPlanDetailsId;
    private Double amount;

}
