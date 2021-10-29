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

        return companyDetailsDTO;
    }
	
}
