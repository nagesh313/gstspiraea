package com.nextsaa.gstspiraea.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "paymentplan_details")
public class PaymentPlanDetails {

	@Id
	@Column(name = "paymentplanid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long paymentplanid;

	@Column(name = "payplan_location")
	private String payplanLocation;

	@Column(name = "payplanname")
	private String payplanname;

	@Column(name = "partnershipid")
	private Long partnershipid;

	@Column(name = "payplanamount")
	private Double payplanamount;

	@Column(name = "gstamount", nullable = false)
	private Double gstamount;

	@Column(name = "totalamount", nullable = false)
	private Double totalamount;
		
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
	
	@Column(name = "isactive")
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
