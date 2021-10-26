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
@Table(name = "transaction_details")
public class TransactionDetails {

	@Id
	@Column(name = "transactionid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long transactionId;

	@Column(name = "transaction_date", nullable = false)
	private Date transactionDate;

	@Column(name = "transaction_location")
	private String transactionLocation;

	@Column(name = "application_id", nullable = false)
	private Long applicationid;

	@Column(name = "userid")
	private Long userid;

	@Column(name = "transaction_details", nullable = false)
	private String transactionDetails;

	@Column(name = "transaction_description", nullable = false)
	private String transactionDescription;

	@Column(name = "transaction_amount", nullable = false)
	private Double transactionAmount;
	
	@Column(name = "online_payment_date", nullable = false)
	private Date onlinePaymentDate;

	@Column(name = "online_payment_id")
	private String onlinePaymentid;
	
	@Column(name = "online_payment_signature")
	private String onlinePaymentsignature;
	
	@Column(name = "mode_of_payment")
	private String modeOfPayment;
	
	@Column(name = "transaction_status")
	private int transactionStatus;
		
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

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public Date getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getTransactionLocation() {
		return transactionLocation;
	}

	public void setTransactionLocation(String transactionLocation) {
		this.transactionLocation = transactionLocation;
	}

	public Long getApplicationid() {
		return applicationid;
	}

	public void setApplicationid(Long applicationid) {
		this.applicationid = applicationid;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getTransactionDetails() {
		return transactionDetails;
	}

	public void setTransactionDetails(String transactionDetails) {
		this.transactionDetails = transactionDetails;
	}

	public String getTransactionDescription() {
		return transactionDescription;
	}

	public void setTransactionDescription(String transactionDescription) {
		this.transactionDescription = transactionDescription;
	}
	
	public Double getTransactionAmount() {
		return transactionAmount;
	}

	public void setTransactionAmount(Double transactionAmount) {
		this.transactionAmount = transactionAmount;
	}

	public Date getOnlinePaymentDate() {
		return onlinePaymentDate;
	}

	public void setOnlinePaymentDate(Date onlinePaymentDate) {
		this.onlinePaymentDate = onlinePaymentDate;
	}

	public String getOnlinePaymentid() {
		return onlinePaymentid;
	}

	public void setOnlinePaymentid(String onlinePaymentid) {
		this.onlinePaymentid = onlinePaymentid;
	}

	public String getOnlinePaymentsignature() {
		return onlinePaymentsignature;
	}

	public void setOnlinePaymentsignature(String onlinePaymentsignature) {
		this.onlinePaymentsignature = onlinePaymentsignature;
	}

	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}

	public int getTransactionStatus() {
		return transactionStatus;
	}

	public void setTransactionStatus(int transactionStatus) {
		this.transactionStatus = transactionStatus;
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
	
}
