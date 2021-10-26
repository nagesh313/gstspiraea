package com.nextsaa.gstspiraea.dto;

import java.time.LocalDateTime;


public class PaymentPlanDetailsDTO {

	private Long paymentplanid;

	private String payplanLocation;

	private String payplanname;

	private Long partnershipid;

	private Double payplanamount;

	private Double gstamount;

	private Double totalamount;
		
	private LocalDateTime createdOn;

	private String createdBy;

	private LocalDateTime modifiedOn;

	private String modifiedBy;

	private String remarks;
	
	private int isactive;

	public Long getPaymentplanid() {
		return paymentplanid;
	}

	public void setPaymentplanid(Long paymentplanid) {
		this.paymentplanid = paymentplanid;
	}

	public String getPayplanLocation() {
		return payplanLocation;
	}

	public void setPayplanLocation(String payplanLocation) {
		this.payplanLocation = payplanLocation;
	}

	public String getPayplanname() {
		return payplanname;
	}

	public void setPayplanname(String payplanname) {
		this.payplanname = payplanname;
	}

	public Long getPartnershipid() {
		return partnershipid;
	}

	public void setPartnershipid(Long partnershipid) {
		this.partnershipid = partnershipid;
	}

	public Double getPayplanamount() {
		return payplanamount;
	}

	public void setPayplanamount(Double payplanamount) {
		this.payplanamount = payplanamount;
	}

	public Double getGstamount() {
		return gstamount;
	}

	public void setGstamount(Double gstamount) {
		this.gstamount = gstamount;
	}

	public Double getTotalamount() {
		return totalamount;
	}

	public void setTotalamount(Double totalamount) {
		this.totalamount = totalamount;
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

	public int getIsactive() {
		return isactive;
	}

	public void setIsactive(int isactive) {
		this.isactive = isactive;
	}
	
}
