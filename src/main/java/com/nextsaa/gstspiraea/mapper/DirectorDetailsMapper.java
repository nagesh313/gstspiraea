package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.DirectorDetailsDTO;
import com.nextsaa.gstspiraea.entity.DirectorDetails;


public class DirectorDetailsMapper {

    public static DirectorDetails mapToEntity(DirectorDetailsDTO companyDetailsDTO) {
    	DirectorDetails companyDetails = new DirectorDetails();
    	companyDetails.setDirectordetailsid(companyDetailsDTO.getDirectordetailsid());
    	companyDetails.setDirectorName(companyDetailsDTO.getDirectorName());
    	companyDetails.setDirectordin(companyDetailsDTO.getDirectordin());
    	companyDetails.setDirectorfatherName(companyDetailsDTO.getDirectorfatherName());
    	companyDetails.setAdharnumber(companyDetailsDTO.getAdharnumber());
    	companyDetails.setAdharphoto(companyDetailsDTO.getAdharphoto());
    	companyDetails.setResident_address(companyDetailsDTO.getResident_address());
    	companyDetails.setPhoto(companyDetailsDTO.getPhoto());
    	companyDetails.setIsAuthorised(companyDetailsDTO.getIsAuthorised());
    	companyDetails.setCompanydetailsid(companyDetailsDTO.getCompanydetailsid());
    	
    	companyDetails.setIsActive(companyDetailsDTO.getIsActive());
    	companyDetails.setCreatedBy(companyDetailsDTO.getCreatedBy());
    	companyDetails.setCreatedOn(companyDetailsDTO.getCreatedOn());
    	companyDetails.setModifiedBy(companyDetailsDTO.getModifiedBy());
    	companyDetails.setModifiedOn(companyDetailsDTO.getModifiedOn());
    	companyDetails.setStatus(companyDetailsDTO.getStatus());
    	companyDetails.setRemark(companyDetailsDTO.getRemark());
    	
        return companyDetails;
    }

	public static DirectorDetailsDTO mapToDto(DirectorDetails companyDetails) {
		DirectorDetailsDTO companyDetailsDTO = new DirectorDetailsDTO();
		
		companyDetailsDTO.setDirectordetailsid(companyDetails.getDirectordetailsid());
		companyDetailsDTO.setDirectorName(companyDetails.getDirectorName());
		companyDetailsDTO.setDirectordin(companyDetails.getDirectordin());
		companyDetailsDTO.setDirectorfatherName(companyDetails.getDirectorfatherName());
		companyDetailsDTO.setAdharnumber(companyDetails.getAdharnumber());
		companyDetailsDTO.setAdharphoto(companyDetails.getAdharphoto());
		companyDetailsDTO.setResident_address(companyDetails.getResident_address());
		companyDetailsDTO.setPhoto(companyDetails.getPhoto());
		companyDetailsDTO.setIsAuthorised(companyDetails.getIsAuthorised());
		companyDetailsDTO.setCompanydetailsid(companyDetails.getCompanydetailsid());
		
		companyDetailsDTO.setIsActive(companyDetails.getIsActive());
		companyDetailsDTO.setCreatedBy(companyDetails.getCreatedBy());
		companyDetailsDTO.setCreatedOn(companyDetails.getCreatedOn());
		companyDetailsDTO.setModifiedBy(companyDetails.getModifiedBy());
		companyDetailsDTO.setModifiedOn(companyDetails.getModifiedOn());
		companyDetailsDTO.setStatus(companyDetails.getStatus());
		companyDetailsDTO.setRemark(companyDetails.getRemark());
        return companyDetailsDTO;
    }
	
}
