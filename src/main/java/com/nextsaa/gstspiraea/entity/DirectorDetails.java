package com.nextsaa.gstspiraea.entity;

import java.sql.Blob;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "directordetails")
public class DirectorDetails {

	@Id
	@Column(name = "directordetailsid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long directordetailsid;

	@Column(name = "directorName", nullable = false)
	private String directorName;

	@Column(name = "directordin")
	private String directordin;

	@Column(name = "directorfatherName")
	private String directorfatherName;
	
	@Column(name = "adharnumber", nullable = false)
	private String adharnumber;

	@Column(name = "adharphoto", nullable = false)
	private Blob adharphoto;

	@Column(name = "resident_address", nullable = false)
	private String resident_address;
	
	@Column(name = "photo", nullable = false)
	private Blob photo;
	
	@Column(name = "isAuthorised", nullable = false)
	private int isAuthorised;

	@Column(name = "companydetailsid")
	private Long companydetailsid;
	
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
