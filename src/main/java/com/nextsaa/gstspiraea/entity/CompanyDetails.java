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
@Table(name = "companydetails")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private int hsn1;
    private int hsn2;
    private int hsn3;
    private int hsn4;
    private int hsn5;
    private String accountnumber;
    private String ifsccode;
    private String cancelcheqphoto;
    private String tradelicensenumber;
    private String tradelicensephoto;
    private boolean isActive;

    @Column(name = "createdon")
    @CreationTimestamp
    private LocalDateTime createdOn;

    @Column(name = "createdby")
    private String createdBy;

    @CreationTimestamp
    private LocalDateTime modifiedOn;

    @Column(name = "modifiedby")
    private String modifiedBy;

    @Column(name = "status")
    private String status = "DRAFT";
    private String gstDocument;
    @Column(name = "remark")
    private String remark;
    private String razorpayOrder;
    @OneToOne
    private PaymentPlanLocationDetails paymentPlanLocationDetails;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Director> directorList;
    private String certificateOfIncorportation;
    private String declarationOfAuthorisedSignatory;
    @OneToMany(cascade = CascadeType.ALL)
    private List<GSTCertificatesInOtherStates> gstCertificatesInOtherStates;
}
