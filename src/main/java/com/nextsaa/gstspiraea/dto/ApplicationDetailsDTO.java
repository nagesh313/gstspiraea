package com.nextsaa.gstspiraea.dto;

import java.time.LocalDateTime;


import java.util.Date;

public class ApplicationDetailsDTO {

	private Long applicationid;

	private Long proprietorshipid;
	
	private String modeOfPayment;

	private Long llpid;

	private Long partnershipid;

	private Long companyid;

	private Date applicationDate;

	private String applicationLocation;

	private Long userid;
	
	private Long paymentplanid;
	
	private Date paymentDate;
	
	private Date transactionid;
	
	private Date requestedDeliveryDate;
	
	private Date actualDeliveryDate;
	
	private String applicationStatus;
	
	private String paymentStatus;
	
	private String refundStatus;
		
	private LocalDateTime createdOn;

	private String createdBy;

	private LocalDateTime modifiedOn;

	private String modifiedBy;

	private String remarks;
	
	private String cancelReason;
	
	private String cancelDescription;

	public Long getApplicationid() {
		return applicationid;
	}

	public void setApplicationid(Long applicationid) {
		this.applicationid = applicationid;
	}

	public Long getProprietorshipid() {
		return proprietorshipid;
	}

	public void setProprietorshipid(Long proprietorshipid) {
		this.proprietorshipid = proprietorshipid;
	}

	public Long getLlpid() {
		return llpid;
	}

	public void setLlpid(Long llpid) {
		this.llpid = llpid;
	}
	
	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}

	public Long getPartnershipid() {
		return partnershipid;
	}

	public void setPartnershipid(Long partnershipid) {
		this.partnershipid = partnershipid;
	}

	public Long getCompanyid() {
		return companyid;
	}

	public void setCompanyid(Long companyid) {
		this.companyid = companyid;
	}

	public Date getApplicationDate() {
		return applicationDate;
	}

	public void setApplicationDate(Date applicationDate) {
		this.applicationDate = applicationDate;
	}

	public String getApplicationLocation() {
		return applicationLocation;
	}

	public void setApplicationLocation(String applicationLocation) {
		this.applicationLocation = applicationLocation;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public Long getPaymentplanid() {
		return paymentplanid;
	}

	public void setPaymentplanid(Long paymentplanid) {
		this.paymentplanid = paymentplanid;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Date getTransactionid() {
		return transactionid;
	}

	public void setTransactionid(Date transactionid) {
		this.transactionid = transactionid;
	}

	public Date getRequestedDeliveryDate() {
		return requestedDeliveryDate;
	}

	public void setRequestedDeliveryDate(Date requestedDeliveryDate) {
		this.requestedDeliveryDate = requestedDeliveryDate;
	}

	public Date getActualDeliveryDate() {
		return actualDeliveryDate;
	}

	public void setActualDeliveryDate(Date actualDeliveryDate) {
		this.actualDeliveryDate = actualDeliveryDate;
	}

	public String getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public String getRefundStatus() {
		return refundStatus;
	}

	public void setRefundStatus(String refundStatus) {
		this.refundStatus = refundStatus;
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

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getCancelReason() {
		return cancelReason;
	}

	public void setCancelReason(String cancelReason) {
		this.cancelReason = cancelReason;
	}

	public String getCancelDescription() {
		return cancelDescription;
	}

	public void setCancelDescription(String cancelDescription) {
		this.cancelDescription = cancelDescription;
	}
	
	
}
