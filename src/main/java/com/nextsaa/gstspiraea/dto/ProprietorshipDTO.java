package com.nextsaa.gstspiraea.dto;

import java.sql.Blob;

import java.time.LocalDateTime;
import java.util.Date;

public class ProprietorshipDTO {
	
	private Long proprietorshipid;

	private String personName;

	private String legalbusinessName;

	private String tradeName;

	private Double mobile;

	private String email;
	
	private String pannumber;
	
	private Blob panphoto;

	private int composition;

	private Date commencementDate;
	
	private String principleplace;
	
	private Blob pricipleelectricityphoto;
	
	private Blob priciplerentphoto;
	
	private Blob priciplenocphoto;
	
	private Blob additionalplace;
	
	private Blob additionalelectricityphoto;
	
	private Blob additionalrentphoto;
	
	private Blob additionalnocphoto;

	private String propfatherName;
	
	private String propadharnumber;
	
	private Blob propadharphoto;
	
	private String resident_address;
	
	private Blob photo;
	
	private String authsignname;
	
	private String signfathername;
	
	private String signadharnumber;
	
	private Blob signadharphoto;
	
	private String residentsignaddress;
	
	private Blob signphoto;
	
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
	
	private Blob cancelcheqphoto;
	
	private String tradelicensenumber;
	
	private Blob tradelicensephoto;
	
	private int isActive;
		
	private LocalDateTime createdOn;

	private String createdBy;

	private LocalDateTime modifiedOn;

	private String modifiedBy;

	private String status;
	
	private String remark;

	public Long getProprietorshipid() {
		return proprietorshipid;
	}

	public void setProprietorshipid(Long proprietorshipid) {
		this.proprietorshipid = proprietorshipid;
	}

	public String getPersonName() {
		return personName;
	}

	public void setPersonName(String personName) {
		this.personName = personName;
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

	public String getPropfatherName() {
		return propfatherName;
	}

	public void setPropfatherName(String propfatherName) {
		this.propfatherName = propfatherName;
	}

	public String getPropadharnumber() {
		return propadharnumber;
	}

	public void setPropadharnumber(String propadharnumber) {
		this.propadharnumber = propadharnumber;
	}

	public Blob getPropadharphoto() {
		return propadharphoto;
	}

	public void setPropadharphoto(Blob propadharphoto) {
		this.propadharphoto = propadharphoto;
	}

	public String getResident_address() {
		return resident_address;
	}

	public void setResident_address(String resident_address) {
		this.resident_address = resident_address;
	}

	public Blob getPhoto() {
		return photo;
	}

	public void setPhoto(Blob photo) {
		this.photo = photo;
	}

	public String getAuthsignname() {
		return authsignname;
	}

	public void setAuthsignname(String authsignname) {
		this.authsignname = authsignname;
	}

	public String getSignfathername() {
		return signfathername;
	}

	public void setSignfathername(String signfathername) {
		this.signfathername = signfathername;
	}

	public String getSignadharnumber() {
		return signadharnumber;
	}

	public void setSignadharnumber(String signadharnumber) {
		this.signadharnumber = signadharnumber;
	}

	public Blob getSignadharphoto() {
		return signadharphoto;
	}

	public void setSignadharphoto(Blob signadharphoto) {
		this.signadharphoto = signadharphoto;
	}

	public String getResidentsignaddress() {
		return residentsignaddress;
	}

	public void setResidentsignaddress(String residentsignaddress) {
		this.residentsignaddress = residentsignaddress;
	}

	public Blob getSignphoto() {
		return signphoto;
	}

	public void setSignphoto(Blob signphoto) {
		this.signphoto = signphoto;
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
