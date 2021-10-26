package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.CompanyDetailsDTO;
import com.nextsaa.gstspiraea.entity.CompanyDetails;

public class CompanyDetailsMapper {

    public static CompanyDetails mapToEntity(CompanyDetailsDTO companyDetailsDTO) {
    	CompanyDetails companyDetails = new CompanyDetails();
    	companyDetails.setCompanydetailsid(companyDetailsDTO.getCompanydetailsid());
    	companyDetails.setFirmName(companyDetailsDTO.getFirmName());
    	companyDetails.setLegalbusinessName(companyDetailsDTO.getLegalbusinessName());
    	companyDetails.setTradeName(companyDetailsDTO.getTradeName());
    	companyDetails.setMobile(companyDetailsDTO.getMobile());
    	companyDetails.setEmail(companyDetailsDTO.getEmail());
    	companyDetails.setPannumber(companyDetailsDTO.getPannumber());
    	companyDetails.setPanphoto(companyDetailsDTO.getPanphoto());
    	companyDetails.setComposition(companyDetailsDTO.getComposition());
    	companyDetails.setCommencementDate(companyDetailsDTO.getCommencementDate());
    	companyDetails.setPrincipleplace(companyDetailsDTO.getPrincipleplace());
    	companyDetails.setPricipleelectricityphoto(companyDetailsDTO.getPricipleelectricityphoto());
    	companyDetails.setPriciplerentphoto(companyDetailsDTO.getPriciplerentphoto());
    	companyDetails.setPriciplenocphoto(companyDetailsDTO.getPriciplenocphoto());
    	companyDetails.setAdditionalplace(companyDetailsDTO.getAdditionalplace());
    	companyDetails.setAdditionalelectricityphoto(companyDetailsDTO.getAdditionalelectricityphoto());
    	companyDetails.setAdditionalrentphoto(companyDetailsDTO.getAdditionalelectricityphoto());
    	companyDetails.setAdditionalnocphoto(companyDetailsDTO.getAdditionalnocphoto());
    	companyDetails.setBusinessactivity(companyDetailsDTO.getBusinessactivity());
    	companyDetails.setHsn1(companyDetailsDTO.getHsn1());
    	companyDetails.setHsn2(companyDetailsDTO.getHsn2());
    	companyDetails.setHsn3(companyDetailsDTO.getHsn3());
    	companyDetails.setHsn4(companyDetailsDTO.getHsn4());
    	companyDetails.setHsn5(companyDetailsDTO.getHsn5());
    	companyDetails.setAccountname(companyDetailsDTO.getAccountname());
    	companyDetails.setAccountnumber(companyDetailsDTO.getAccountnumber());
    	companyDetails.setIfsc(companyDetailsDTO.getIfsc());
    	companyDetails.setBranchcode(companyDetailsDTO.getBranchcode());
    	companyDetails.setBranchname(companyDetailsDTO.getBranchname());
    	companyDetails.setCancelcheqphoto(companyDetailsDTO.getCancelcheqphoto());
    	companyDetails.setTradelicensenumber(companyDetailsDTO.getTradelicensenumber());
    	companyDetails.setTradelicensephoto(companyDetailsDTO.getTradelicensephoto());
    	companyDetails.setIsActive(companyDetailsDTO.getIsActive());
    	companyDetails.setCreatedBy(companyDetailsDTO.getCreatedBy());
    	companyDetails.setCreatedOn(companyDetailsDTO.getCreatedOn());
    	companyDetails.setModifiedBy(companyDetailsDTO.getModifiedBy());
    	companyDetails.setModifiedOn(companyDetailsDTO.getModifiedOn());
    	companyDetails.setStatus(companyDetailsDTO.getStatus());
    	companyDetails.setRemark(companyDetailsDTO.getRemark());
    	
        return companyDetails;
    }

	public static CompanyDetailsDTO mapToDto(CompanyDetails companyDetails) {
		CompanyDetailsDTO companyDetailsDTO = new CompanyDetailsDTO();
		companyDetailsDTO.setCompanydetailsid(companyDetails.getCompanydetailsid());
		companyDetailsDTO.setFirmName(companyDetails.getFirmName());
		companyDetailsDTO.setLegalbusinessName(companyDetails.getLegalbusinessName());
		companyDetailsDTO.setTradeName(companyDetails.getTradeName());
		companyDetailsDTO.setMobile(companyDetails.getMobile());
		companyDetailsDTO.setEmail(companyDetails.getEmail());
		companyDetailsDTO.setPannumber(companyDetails.getPannumber());
		companyDetailsDTO.setPanphoto(companyDetails.getPanphoto());
		companyDetailsDTO.setComposition(companyDetails.getComposition());
		companyDetailsDTO.setCommencementDate(companyDetails.getCommencementDate());
		companyDetailsDTO.setPrincipleplace(companyDetails.getPrincipleplace());
		companyDetailsDTO.setPricipleelectricityphoto(companyDetails.getPricipleelectricityphoto());
		companyDetailsDTO.setPriciplerentphoto(companyDetails.getPriciplerentphoto());
		companyDetailsDTO.setPriciplenocphoto(companyDetails.getPriciplenocphoto());
		companyDetailsDTO.setAdditionalplace(companyDetails.getAdditionalplace());
		companyDetailsDTO.setAdditionalelectricityphoto(companyDetails.getAdditionalelectricityphoto());
		companyDetailsDTO.setAdditionalrentphoto(companyDetails.getAdditionalelectricityphoto());
		companyDetailsDTO.setAdditionalnocphoto(companyDetails.getAdditionalnocphoto());
		companyDetailsDTO.setBusinessactivity(companyDetails.getBusinessactivity());
		companyDetailsDTO.setHsn1(companyDetails.getHsn1());
		companyDetailsDTO.setHsn2(companyDetails.getHsn2());
		companyDetailsDTO.setHsn3(companyDetails.getHsn3());
		companyDetailsDTO.setHsn4(companyDetails.getHsn4());
		companyDetailsDTO.setHsn5(companyDetails.getHsn5());
		companyDetailsDTO.setAccountname(companyDetails.getAccountname());
		companyDetailsDTO.setAccountnumber(companyDetails.getAccountnumber());
		companyDetailsDTO.setIfsc(companyDetails.getIfsc());
		companyDetailsDTO.setBranchcode(companyDetails.getBranchcode());
		companyDetailsDTO.setBranchname(companyDetails.getBranchname());
		companyDetailsDTO.setCancelcheqphoto(companyDetails.getCancelcheqphoto());
		companyDetailsDTO.setTradelicensenumber(companyDetails.getTradelicensenumber());
		companyDetailsDTO.setTradelicensephoto(companyDetails.getTradelicensephoto());
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
