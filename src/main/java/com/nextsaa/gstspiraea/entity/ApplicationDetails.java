package com.nextsaa.gstspiraea.entity;

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
@Table(name = "application_details")
public class ApplicationDetails {

	@Id
	@Column(name = "applicationid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long applicationid;

	@Column(name = "proprietorshipid")
	private Long proprietorshipid;

	@Column(name = "llpid")
	private Long llpid;

	@Column(name = "partnershipid")
	private Long partnershipid;

	@Column(name = "companyid")
	private Long companyid;

	@Column(name = "application_date", nullable = false)
	private Date applicationDate;

	@Column(name = "application_location", nullable = false)
	private String applicationLocation;
	
	@Column(name = "mode_of_payment", nullable = false)
	private String modeOfPayment;

	@Column(name = "userid", nullable = false)
	private Long userid;
	
	@Column(name = "paymentplanid", nullable = false)
	private Long paymentplanid;
	
	@Column(name = "payment_date")
	private Date paymentDate;
	
	@Column(name = "transactionid")
	private Date transactionid;
	
	@Column(name = "requested_delivery_date")
	private Date requestedDeliveryDate;
	
	@Column(name = "actual_delivery_date")
	private Date actualDeliveryDate;
	
	@Column(name = "application_status")
	private String applicationStatus;
	
	@Column(name = "payment_status")
	private String paymentStatus;
	
	@Column(name = "refund_status")
	private String refundStatus;
		
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

	@Column(name = "remark")
	private String remarks;
	
	@Column(name = "cancel_reason")
	private String cancelReason;
	
	@Column(name = "cancel_description")
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
	
	

	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
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
