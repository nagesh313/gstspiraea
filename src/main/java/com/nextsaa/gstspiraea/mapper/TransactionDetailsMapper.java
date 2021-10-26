package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.TransactionDetailsDTO;
import com.nextsaa.gstspiraea.entity.TransactionDetails;

public class TransactionDetailsMapper {

    public static TransactionDetails mapToEntity(TransactionDetailsDTO applicationDetailsDTO) {
    	TransactionDetails applicationDetails = new TransactionDetails();
    	applicationDetails.setTransactionId(applicationDetailsDTO.getTransactionId());
    	applicationDetails.setTransactionDate(applicationDetailsDTO.getTransactionDate());
    	applicationDetails.setTransactionLocation(applicationDetailsDTO.getTransactionLocation());
    	applicationDetails.setApplicationid(applicationDetailsDTO.getApplicationid());
    	applicationDetails.setUserid(applicationDetailsDTO.getUserid());
    	applicationDetails.setTransactionDetails(applicationDetailsDTO.getTransactionDetails());
    	applicationDetails.setTransactionDescription(applicationDetailsDTO.getTransactionDescription());
    	applicationDetails.setTransactionAmount(applicationDetailsDTO.getTransactionAmount());
    	applicationDetails.setOnlinePaymentDate(applicationDetailsDTO.getOnlinePaymentDate());
    	applicationDetails.setOnlinePaymentid(applicationDetailsDTO.getOnlinePaymentid());
    	applicationDetails.setOnlinePaymentsignature(applicationDetailsDTO.getOnlinePaymentsignature());
    	applicationDetails.setModeOfPayment(applicationDetailsDTO.getModeOfPayment());
    	applicationDetails.setTransactionStatus(applicationDetailsDTO.getTransactionStatus());
    	
    	applicationDetails.setCreatedBy(applicationDetailsDTO.getCreatedBy());
    	applicationDetails.setCreatedOn(applicationDetailsDTO.getCreatedOn());
    	applicationDetails.setModifiedBy(applicationDetailsDTO.getModifiedBy());
    	applicationDetails.setModifiedOn(applicationDetailsDTO.getModifiedOn());
    	applicationDetails.setRemarks(applicationDetailsDTO.getRemarks());
        return applicationDetails;
    }

	public static TransactionDetailsDTO mapToDto(TransactionDetails applicationDetails) {
		TransactionDetailsDTO applicationDetailsDTO = new TransactionDetailsDTO();
		applicationDetailsDTO.setTransactionId(applicationDetails.getTransactionId());
		applicationDetailsDTO.setTransactionDate(applicationDetails.getTransactionDate());
		applicationDetailsDTO.setTransactionLocation(applicationDetails.getTransactionLocation());
		applicationDetailsDTO.setApplicationid(applicationDetails.getApplicationid());
		applicationDetailsDTO.setUserid(applicationDetails.getUserid());
		applicationDetailsDTO.setTransactionDetails(applicationDetails.getTransactionDetails());
		applicationDetailsDTO.setTransactionDescription(applicationDetails.getTransactionDescription());
		applicationDetailsDTO.setTransactionAmount(applicationDetails.getTransactionAmount());
		applicationDetailsDTO.setOnlinePaymentDate(applicationDetails.getOnlinePaymentDate());
		applicationDetailsDTO.setOnlinePaymentid(applicationDetails.getOnlinePaymentid());
		applicationDetailsDTO.setOnlinePaymentsignature(applicationDetails.getOnlinePaymentsignature());
		applicationDetailsDTO.setModeOfPayment(applicationDetails.getModeOfPayment());
		applicationDetailsDTO.setTransactionStatus(applicationDetails.getTransactionStatus());
		
		applicationDetailsDTO.setCreatedBy(applicationDetails.getCreatedBy());
		applicationDetailsDTO.setCreatedOn(applicationDetails.getCreatedOn());
		applicationDetailsDTO.setModifiedBy(applicationDetails.getModifiedBy());
		applicationDetailsDTO.setModifiedOn(applicationDetails.getModifiedOn());
		applicationDetailsDTO.setRemarks(applicationDetails.getRemarks());
        return applicationDetailsDTO;
    }
	
}
