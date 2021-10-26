package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.ApplicationDetailsDTO;
import com.nextsaa.gstspiraea.entity.ApplicationDetails;

public class ApplicationDetailsMapper {

    public static ApplicationDetails mapToEntity(ApplicationDetailsDTO applicationDetailsDTO) {
    	ApplicationDetails applicationDetails = new ApplicationDetails();
    	applicationDetails.setApplicationid(applicationDetailsDTO.getApplicationid());
    	applicationDetails.setApplicationDate(applicationDetailsDTO.getApplicationDate());
    	applicationDetails.setProprietorshipid(applicationDetailsDTO.getProprietorshipid());
    	applicationDetails.setLlpid(applicationDetailsDTO.getLlpid());    	
    	applicationDetails.setPartnershipid(applicationDetailsDTO.getPartnershipid());
    	applicationDetails.setCompanyid(applicationDetailsDTO.getCompanyid());
    	applicationDetails.setApplicationLocation(applicationDetailsDTO.getApplicationLocation());
    	applicationDetails.setUserid(applicationDetailsDTO.getUserid());
    	applicationDetails.setPaymentplanid(applicationDetailsDTO.getPaymentplanid());
    	applicationDetails.setModeOfPayment(applicationDetailsDTO.getModeOfPayment());
    	applicationDetails.setPaymentDate(applicationDetailsDTO.getPaymentDate());
    	applicationDetails.setTransactionid(applicationDetailsDTO.getTransactionid());
    	applicationDetails.setRequestedDeliveryDate(applicationDetailsDTO.getRequestedDeliveryDate());
    	applicationDetails.setActualDeliveryDate(applicationDetailsDTO.getActualDeliveryDate());
    	applicationDetails.setApplicationStatus(applicationDetailsDTO.getApplicationStatus());
    	applicationDetails.setPaymentStatus(applicationDetailsDTO.getPaymentStatus());
    	applicationDetails.setRefundStatus(applicationDetailsDTO.getRefundStatus());
    	applicationDetails.setCreatedBy(applicationDetailsDTO.getCreatedBy());
    	applicationDetails.setCreatedOn(applicationDetailsDTO.getCreatedOn());
    	applicationDetails.setModifiedBy(applicationDetailsDTO.getModifiedBy());
    	applicationDetails.setModifiedOn(applicationDetailsDTO.getModifiedOn());
    	applicationDetails.setRemarks(applicationDetailsDTO.getRemarks());
    	applicationDetails.setCancelReason(applicationDetailsDTO.getCancelReason());
    	applicationDetails.setCancelDescription(applicationDetailsDTO.getCancelDescription());
        return applicationDetails;
    }

	public static ApplicationDetailsDTO mapToDto(ApplicationDetails applicationDetails) {
		ApplicationDetailsDTO applicationDetailsDTO = new ApplicationDetailsDTO();
		applicationDetailsDTO.setApplicationid(applicationDetails.getApplicationid());
		applicationDetailsDTO.setApplicationDate(applicationDetails.getApplicationDate());
		applicationDetailsDTO.setProprietorshipid(applicationDetails.getProprietorshipid());
		applicationDetailsDTO.setLlpid(applicationDetails.getLlpid());    	
		applicationDetailsDTO.setPartnershipid(applicationDetails.getPartnershipid());
		applicationDetailsDTO.setCompanyid(applicationDetails.getCompanyid());
		applicationDetailsDTO.setApplicationLocation(applicationDetails.getApplicationLocation());
		applicationDetailsDTO.setUserid(applicationDetails.getUserid());
		applicationDetailsDTO.setPaymentplanid(applicationDetails.getPaymentplanid());
		applicationDetailsDTO.setModeOfPayment(applicationDetails.getModeOfPayment());
		applicationDetailsDTO.setPaymentDate(applicationDetails.getPaymentDate());
		applicationDetailsDTO.setTransactionid(applicationDetails.getTransactionid());
		applicationDetailsDTO.setRequestedDeliveryDate(applicationDetails.getRequestedDeliveryDate());
		applicationDetailsDTO.setActualDeliveryDate(applicationDetails.getActualDeliveryDate());
		applicationDetailsDTO.setApplicationStatus(applicationDetails.getApplicationStatus());
		applicationDetailsDTO.setPaymentStatus(applicationDetails.getPaymentStatus());
		applicationDetailsDTO.setRefundStatus(applicationDetails.getRefundStatus());
		applicationDetailsDTO.setCreatedBy(applicationDetails.getCreatedBy());
		applicationDetailsDTO.setCreatedOn(applicationDetails.getCreatedOn());
		applicationDetailsDTO.setModifiedBy(applicationDetails.getModifiedBy());
		applicationDetailsDTO.setModifiedOn(applicationDetails.getModifiedOn());
		applicationDetailsDTO.setRemarks(applicationDetails.getRemarks());
		applicationDetailsDTO.setCancelReason(applicationDetails.getCancelReason());
		applicationDetailsDTO.setCancelDescription(applicationDetails.getCancelDescription());
        return applicationDetailsDTO;
    }
	
}
