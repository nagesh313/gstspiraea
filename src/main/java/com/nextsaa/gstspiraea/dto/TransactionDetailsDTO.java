package com.nextsaa.gstspiraea.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class TransactionDetailsDTO {

	private Long transactionId;

	private Date transactionDate;

	private String transactionLocation;

	private Long applicationid;

	private Long userid;

	private String transactionDetails;

	private String transactionDescription;

	private Double transactionAmount;
	
	private Date onlinePaymentDate;

	private String onlinePaymentid;
	
	private String onlinePaymentsignature;
	
	private String modeOfPayment;
	
	private int transactionStatus;
		
	private LocalDateTime createdOn;

	private String createdBy;

	private LocalDateTime modifiedOn;

	private String modifiedBy;

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
