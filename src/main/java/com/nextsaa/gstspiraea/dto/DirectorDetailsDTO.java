package com.nextsaa.gstspiraea.dto;

import java.sql.Blob;


import java.time.LocalDateTime;

public class DirectorDetailsDTO {

	private Long directordetailsid;

	private String directorName;

	private String directordin;

	private String directorfatherName;
	
	private String adharnumber;

	private Blob adharphoto;

	private String resident_address;
	
	private Blob photo;
	
	private int isAuthorised;

	private Long companydetailsid;
	
	private int isActive;
		
	private LocalDateTime createdOn;

	private String createdBy;

	private LocalDateTime modifiedOn;

	private String modifiedBy;

	private String status;
	
	private String remark;

	public String getAdharnumber() {
		return adharnumber;
	}

	public void setAdharnumber(String adharnumber) {
		this.adharnumber = adharnumber;
	}
	
	public Long getDirectordetailsid() {
		return directordetailsid;
	}

	public void setDirectordetailsid(Long directordetailsid) {
		this.directordetailsid = directordetailsid;
	}

	public String getDirectorName() {
		return directorName;
	}

	public void setDirectorName(String directorName) {
		this.directorName = directorName;
	}

	public String getDirectordin() {
		return directordin;
	}

	public void setDirectordin(String directordin) {
		this.directordin = directordin;
	}

	public String getDirectorfatherName() {
		return directorfatherName;
	}

	public void setDirectorfatherName(String directorfatherName) {
		this.directorfatherName = directorfatherName;
	}

	public Long getCompanydetailsid() {
		return companydetailsid;
	}

	public void setCompanydetailsid(Long companydetailsid) {
		this.companydetailsid = companydetailsid;
	}

	public Blob getAdharphoto() {
		return adharphoto;
	}

	public void setAdharphoto(Blob adharphoto) {
		this.adharphoto = adharphoto;
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

	public int getIsAuthorised() {
		return isAuthorised;
	}

	public void setIsAuthorised(int isAuthorised) {
		this.isAuthorised = isAuthorised;
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
