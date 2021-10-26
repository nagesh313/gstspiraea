package com.nextsaa.gstspiraea.entity;

import java.sql.Blob;
import java.time.LocalDateTime;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "partnership")
public class Partnership {

	@Id
	@Column(name = "partnershipid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long partnershipid;

	@Column(name = "firmName", nullable = false)
	private String firmName;

	@Column(name = "legalbusinessName")
	private String legalbusinessName;

	@Column(name = "tradeName", nullable = false)
	private String tradeName;

	@Column(name = "mobile", nullable = false)
	private Double mobile;

	@Column(name = "email", nullable = false)
	private String email;
	
	@Column(name = "pannumber", nullable = false)
	private String pannumber;
	
	@Column(name = "panphoto", nullable = false)
	private Blob panphoto;

	@Column(name = "composition")
	private int composition;

	@Column(name = "commencementDate")
	private Date commencementDate;
	
	@Column(name = "principleplace")
	private String principleplace;
	
	@Column(name = "pricipleelectricityphoto")
	private Blob pricipleelectricityphoto;
	
	@Column(name = "priciplerentphoto")
	private Blob priciplerentphoto;
	
	@Column(name = "priciplenocphoto")
	private Blob priciplenocphoto;
	
	@Column(name = "additionalplace")
	private Blob additionalplace;
	
	@Column(name = "additionalelectricityphoto")
	private Blob additionalelectricityphoto;
	
	@Column(name = "additionalrentphoto")
	private Blob additionalrentphoto;
	
	@Column(name = "additionalnocphoto")
	private Blob additionalnocphoto;
	
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
	private Blob cancelcheqphoto;
	
	@Column(name = "tradelicensenumber")
	private String tradelicensenumber;
	
	@Column(name = "tradelicensephoto")
	private Blob tradelicensephoto;
	
	@Column(name = "isactive")
	private int isActive;
		
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
	
	@Column(name = "remark")
	private String remark;

	public Long getPartnershipid() {
		return partnershipid;
	}

	public void setPartnershipid(Long partnershipid) {
		this.partnershipid = partnershipid;
	}

	public String getFirmName() {
		return firmName;
	}

	public void setFirmName(String firmName) {
		this.firmName = firmName;
	}

	public String getLegalbusinessName() {
		return legalbusinessName;
	}

	public void setLegalbusinessName(String legalbusinessName) {
		this.legalbusinessName = legalbusinessName;
	}

	public String getTradeName() {
		return tradeName;
	}

	public void setTradeName(String tradeName) {
		this.tradeName = tradeName;
	}

	public Double getMobile() {
		return mobile;
	}

	public void setMobile(Double mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPannumber() {
		return pannumber;
	}

	public void setPannumber(String pannumber) {
		this.pannumber = pannumber;
	}

	public Blob getPanphoto() {
		return panphoto;
	}

	public void setPanphoto(Blob panphoto) {
		this.panphoto = panphoto;
	}

	public int getComposition() {
		return composition;
	}

	public void setComposition(int composition) {
		this.composition = composition;
	}

	public Date getCommencementDate() {
		return commencementDate;
	}

	public void setCommencementDate(Date commencementDate) {
		this.commencementDate = commencementDate;
	}

	public String getPrincipleplace() {
		return principleplace;
	}

	public void setPrincipleplace(String principleplace) {
		this.principleplace = principleplace;
	}

	public Blob getPricipleelectricityphoto() {
		return pricipleelectricityphoto;
	}

	public void setPricipleelectricityphoto(Blob pricipleelectricityphoto) {
		this.pricipleelectricityphoto = pricipleelectricityphoto;
	}

	public Blob getPriciplerentphoto() {
		return priciplerentphoto;
	}

	public void setPriciplerentphoto(Blob priciplerentphoto) {
		this.priciplerentphoto = priciplerentphoto;
	}

	public Blob getPriciplenocphoto() {
		return priciplenocphoto;
	}

	public void setPriciplenocphoto(Blob priciplenocphoto) {
		this.priciplenocphoto = priciplenocphoto;
	}

	public Blob getAdditionalplace() {
		return additionalplace;
	}

	public void setAdditionalplace(Blob additionalplace) {
		this.additionalplace = additionalplace;
	}

	public Blob getAdditionalelectricityphoto() {
		return additionalelectricityphoto;
	}

	public void setAdditionalelectricityphoto(Blob additionalelectricityphoto) {
		this.additionalelectricityphoto = additionalelectricityphoto;
	}

	public Blob getAdditionalrentphoto() {
		return additionalrentphoto;
	}

	public void setAdditionalrentphoto(Blob additionalrentphoto) {
		this.additionalrentphoto = additionalrentphoto;
	}

	public Blob getAdditionalnocphoto() {
		return additionalnocphoto;
	}

	public void setAdditionalnocphoto(Blob additionalnocphoto) {
		this.additionalnocphoto = additionalnocphoto;
	}

	public String getBusinessactivity() {
		return businessactivity;
	}

	public void setBusinessactivity(String businessactivity) {
		this.businessactivity = businessactivity;
	}

	public String getHsn1() {
		return hsn1;
	}

	public void setHsn1(String hsn1) {
		this.hsn1 = hsn1;
	}

	public String getHsn2() {
		return hsn2;
	}

	public void setHsn2(String hsn2) {
		this.hsn2 = hsn2;
	}

	public String getHsn3() {
		return hsn3;
	}

	public void setHsn3(String hsn3) {
		this.hsn3 = hsn3;
	}

	public String getHsn4() {
		return hsn4;
	}

	public void setHsn4(String hsn4) {
		this.hsn4 = hsn4;
	}

	public String getHsn5() {
		return hsn5;
	}

	public void setHsn5(String hsn5) {
		this.hsn5 = hsn5;
	}

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getAccountnumber() {
		return accountnumber;
	}

	public void setAccountnumber(String accountnumber) {
		this.accountnumber = accountnumber;
	}

	public String getIfsc() {
		return ifsc;
	}

	public void setIfsc(String ifsc) {
		this.ifsc = ifsc;
	}

	public String getBranchname() {
		return branchname;
	}

	public void setBranchname(String branchname) {
		this.branchname = branchname;
	}

	public String getBranchcode() {
		return branchcode;
	}

	public void setBranchcode(String branchcode) {
		this.branchcode = branchcode;
	}

	public Blob getCancelcheqphoto() {
		return cancelcheqphoto;
	}

	public void setCancelcheqphoto(Blob cancelcheqphoto) {
		this.cancelcheqphoto = cancelcheqphoto;
	}

	public String getTradelicensenumber() {
		return tradelicensenumber;
	}

	public void setTradelicensenumber(String tradelicensenumber) {
		this.tradelicensenumber = tradelicensenumber;
	}

	public Blob getTradelicensephoto() {
		return tradelicensephoto;
	}

	public void setTradelicensephoto(Blob tradelicensephoto) {
		this.tradelicensephoto = tradelicensephoto;
	}

	public int getIsActive() {
		return isActive;
	}

	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public LocalDateTime getModifiedOn() {
		return modifiedOn;
	}

	public void setModifiedOn(LocalDateTime modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
