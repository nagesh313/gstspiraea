package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.PaymentPlanDetailsDTO;
import com.nextsaa.gstspiraea.entity.PaymentPlanDetails;

public class PaymentPlanDetailsMapper {

    public static PaymentPlanDetails mapToEntity(PaymentPlanDetailsDTO applicationDetailsDTO) {
    	PaymentPlanDetails applicationDetails = new PaymentPlanDetails();
    	applicationDetails.setPaymentplanid(applicationDetailsDTO.getPaymentplanid());
    	applicationDetails.setPayplanLocation(applicationDetailsDTO.getPayplanLocation());
    	applicationDetails.setPayplanname(applicationDetailsDTO.getPayplanname());
    	applicationDetails.setPayplanamount(applicationDetailsDTO.getPayplanamount());
    	applicationDetails.setGstamount(applicationDetailsDTO.getGstamount());
    	applicationDetails.setTotalamount(applicationDetailsDTO.getTotalamount());
    	
    	applicationDetails.setCreatedBy(applicationDetailsDTO.getCreatedBy());
    	applicationDetails.setCreatedOn(applicationDetailsDTO.getCreatedOn());
    	applicationDetails.setModifiedBy(applicationDetailsDTO.getModifiedBy());
    	applicationDetails.setModifiedOn(applicationDetailsDTO.getModifiedOn());
    	applicationDetails.setRemarks(applicationDetailsDTO.getRemarks());
        return applicationDetails;
    }

	public static PaymentPlanDetailsDTO mapToDto(PaymentPlanDetails applicationDetails) {
		PaymentPlanDetailsDTO applicationDetailsDTO = new PaymentPlanDetailsDTO();
		applicationDetails.setPaymentplanid(applicationDetailsDTO.getPaymentplanid());
    	applicationDetails.setPayplanLocation(applicationDetailsDTO.getPayplanLocation());
    	applicationDetails.setPayplanname(applicationDetailsDTO.getPayplanname());
    	applicationDetails.setPayplanamount(applicationDetailsDTO.getPayplanamount());
    	applicationDetails.setGstamount(applicationDetailsDTO.getGstamount());
    	applicationDetails.setTotalamount(applicationDetailsDTO.getTotalamount());
		
		applicationDetailsDTO.setCreatedBy(applicationDetails.getCreatedBy());
		applicationDetailsDTO.setCreatedOn(applicationDetails.getCreatedOn());
		applicationDetailsDTO.setModifiedBy(applicationDetails.getModifiedBy());
		applicationDetailsDTO.setModifiedOn(applicationDetails.getModifiedOn());
		applicationDetailsDTO.setRemarks(applicationDetails.getRemarks());
        return applicationDetailsDTO;
    }
	
}
