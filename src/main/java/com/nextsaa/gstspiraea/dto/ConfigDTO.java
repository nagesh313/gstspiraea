package com.nextsaa.gstspiraea.dto;

import java.time.LocalDateTime;

public class ConfigDTO {

	private Long configId;

	private String configkey;

	private String configvalue;

	private String description;

	private LocalDateTime createdOn;

	private String createdBy;

	private LocalDateTime modifiedOn;

	private String modifiedBy;
	
	private String status;
	
	private String remark;
	
	private int isActive;

	public Long getConfigId() {
		return configId;
	}

	public void setConfigId(Long configId) {
		this.configId = configId;
	}

	public String getConfigkey() {
		return configkey;
	}

	public void setConfigkey(String configkey) {
		this.configkey = configkey;
	}

	public String getConfigvalue() {
		return configvalue;
	}

	public void setConfigvalue(String configvalue) {
		this.configvalue = configvalue;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public int getIsActive() {
		return isActive;
	}

	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}	
	
	

}
