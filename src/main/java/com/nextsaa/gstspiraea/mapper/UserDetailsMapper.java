package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.UserDetailsDTO;

import com.nextsaa.gstspiraea.entity.UserDetails;

public class UserDetailsMapper {

    public static UserDetails mapUserToEntity(UserDetailsDTO userDetailsDTO) {
    	UserDetails userDetails = new UserDetails();
    	userDetails.setUserId(userDetailsDTO.getUserId());
    	userDetails.setFirstName(userDetailsDTO.getFirstName());
    	userDetails.setMiddleName(userDetailsDTO.getMiddleName());
    	userDetails.setLastName(userDetailsDTO.getLastName());
    	userDetails.setDateOfBirth(userDetailsDTO.getDateOfBirth());
    	userDetails.setUserEmail(userDetailsDTO.getUserEmail());
    	userDetails.setMobile(userDetailsDTO.getMobile());
    	userDetails.setGender(userDetailsDTO.getGender());
    	userDetails.setRole(userDetailsDTO.getRole());
    	userDetails.setIsActive(userDetailsDTO.getIsActive());
    	userDetails.setIsArchived(userDetailsDTO.getIsArchived());
    	userDetails.setLoginUserName(userDetailsDTO.getLoginUserName());
    	userDetails.setLoginPassword(userDetailsDTO.getLoginPassword());
    	userDetails.setIsEmailVerified(userDetailsDTO.getIsEmailVerified());
    	userDetails.setIsMobileVerified(userDetailsDTO.getIsMobileVerified());
    	userDetails.setLoginAttempt(userDetailsDTO.getLoginAttempt());
    	userDetails.setCustPhoto(userDetailsDTO.getCustPhoto());  	
    	userDetails.setCreatedBy(userDetailsDTO.getCreatedBy());
    	userDetails.setModifiedBy(userDetailsDTO.getModifiedBy());
    	userDetails.setLastLoginDate(userDetailsDTO.getLastLoginDate());
        return userDetails;
    }

	public static UserDetailsDTO mapUserToDto(UserDetails userDetails) {
		UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
		userDetailsDTO.setUserId(userDetails.getUserId());
		userDetailsDTO.setFirstName(userDetails.getFirstName());
		userDetailsDTO.setMiddleName(userDetails.getMiddleName());
		userDetailsDTO.setLastName(userDetails.getLastName());
		userDetailsDTO.setDateOfBirth(userDetails.getDateOfBirth());
		userDetailsDTO.setUserEmail(userDetails.getUserEmail());
		userDetailsDTO.setMobile(userDetails.getMobile());
		userDetailsDTO.setGender(userDetails.getGender());
		userDetailsDTO.setRole(userDetails.getRole());
		userDetailsDTO.setIsActive(userDetailsDTO.getIsActive());
		userDetailsDTO.setIsArchived(userDetails.getIsArchived());
		userDetailsDTO.setLoginUserName(userDetails.getLoginUserName());
		userDetailsDTO.setLoginPassword(userDetails.getLoginPassword());
		userDetailsDTO.setIsEmailVerified(userDetails.getIsEmailVerified());
		userDetailsDTO.setIsMobileVerified(userDetailsDTO.getIsMobileVerified());
		userDetailsDTO.setLoginAttempt(userDetails.getLoginAttempt());
		userDetailsDTO.setCustPhoto(userDetails.getCustPhoto());
		userDetailsDTO.setCreatedOn(userDetails.getCreatedOn());
		userDetailsDTO.setCreatedBy(userDetails.getCreatedBy());
		userDetailsDTO.setModifiedOn(userDetails.getModifiedOn());
		userDetailsDTO.setModifiedBy(userDetails.getModifiedBy());
		userDetailsDTO.setLastLoginDate(userDetailsDTO.getLastLoginDate());
        return userDetailsDTO;
    }
	
}
