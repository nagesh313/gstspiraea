package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.PartnerDetailsDTO;
import com.nextsaa.gstspiraea.entity.PartnerDetails;

public class PartnerDetailsMapper {

    public static PartnerDetails mapToEntity(PartnerDetailsDTO companyDetailsDTO) {
    	PartnerDetails companyDetails = new PartnerDetails();
    	companyDetails.setPartnerid(companyDetailsDTO.getPartnerid());
    	companyDetails.setPartnerName(companyDetailsDTO.getPartnerName());
    	companyDetails.setPartnerfatherName(companyDetailsDTO.getPartnerfatherName());
    	companyDetails.setAdharnumber(companyDetailsDTO.getAdharnumber());
    	companyDetails.setAdharphoto(companyDetailsDTO.getAdharphoto());
    	companyDetails.setResident_address(companyDetailsDTO.getResident_address());
    	companyDetails.setPhoto(companyDetailsDTO.getPhoto());
    	companyDetails.setIsAuthorised(companyDetailsDTO.getIsAuthorised());
    	companyDetails.setBusinessid(companyDetailsDTO.getBusinessid());
    	
    	companyDetails.setIsActive(companyDetailsDTO.getIsActive());
    	companyDetails.setCreatedBy(companyDetailsDTO.getCreatedBy());
    	companyDetails.setCreatedOn(companyDetailsDTO.getCreatedOn());
    	companyDetails.setModifiedBy(companyDetailsDTO.getModifiedBy());
    	companyDetails.setModifiedOn(companyDetailsDTO.getModifiedOn());
    	companyDetails.setStatus(companyDetailsDTO.getStatus());
    	companyDetails.setRemark(companyDetailsDTO.getRemark());
    	
        return companyDetails;
    }

	public static PartnerDetailsDTO mapToDto(PartnerDetails companyDetails) {
		PartnerDetailsDTO companyDetailsDTO = new PartnerDetailsDTO();
		
		companyDetailsDTO.setPartnerid(companyDetails.getPartnerid());
		companyDetailsDTO.setPartnerName(companyDetails.getPartnerName());
		companyDetailsDTO.setPartnerfatherName(companyDetails.getPartnerfatherName());
		companyDetailsDTO.setAdharnumber(companyDetails.getAdharnumber());
		companyDetailsDTO.setAdharphoto(companyDetails.getAdharphoto());
		companyDetailsDTO.setResident_address(companyDetails.getResident_address());
		companyDetailsDTO.setPhoto(companyDetails.getPhoto());
		companyDetailsDTO.setIsAuthorised(companyDetails.getIsAuthorised());
		companyDetailsDTO.setBusinessid(companyDetails.getBusinessid());
		
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
