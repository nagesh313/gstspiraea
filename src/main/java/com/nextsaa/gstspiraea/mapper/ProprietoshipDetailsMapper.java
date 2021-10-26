package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.ProprietorshipDTO;

import com.nextsaa.gstspiraea.entity.Proprietorship;

public class ProprietoshipDetailsMapper {

    public static Proprietorship mapToEntity(ProprietorshipDTO llpDTO) {
    	Proprietorship llp = new Proprietorship();
    	llp.setProprietorshipid(llpDTO.getProprietorshipid());
    	llp.setPersonName(llpDTO.getPersonName());
    	llp.setLegalbusinessName(llpDTO.getLegalbusinessName());
    	llp.setTradeName(llpDTO.getTradeName());
    	llp.setMobile(llpDTO.getMobile());
    	llp.setEmail(llpDTO.getEmail());
    	llp.setPannumber(llpDTO.getPannumber());
    	llp.setPanphoto(llpDTO.getPanphoto());
    	llp.setComposition(llpDTO.getComposition());
    	llp.setCommencementDate(llpDTO.getCommencementDate());
    	llp.setPrincipleplace(llpDTO.getPrincipleplace());
    	llp.setPricipleelectricityphoto(llpDTO.getPricipleelectricityphoto());
    	llp.setPriciplerentphoto(llpDTO.getPriciplerentphoto());
    	llp.setPriciplenocphoto(llpDTO.getPriciplenocphoto());
    	llp.setAdditionalplace(llpDTO.getAdditionalplace());
    	llp.setAdditionalelectricityphoto(llpDTO.getAdditionalelectricityphoto());
    	llp.setAdditionalrentphoto(llpDTO.getAdditionalelectricityphoto());
    	llp.setAdditionalnocphoto(llpDTO.getAdditionalnocphoto());
    	
    	llp.setPropfatherName(llpDTO.getPropfatherName());
    	llp.setPropadharnumber(llpDTO.getPropadharnumber());
    	llp.setPropadharphoto(llpDTO.getPropadharphoto());
    	llp.setResident_address(llpDTO.getResident_address());
    	llp.setPhoto(llpDTO.getPhoto());
    	llp.setAuthsignname(llpDTO.getAuthsignname());
    	llp.setSignfathername(llpDTO.getSignfathername());
    	llp.setSignadharnumber(llpDTO.getSignadharnumber());
    	llp.setSignadharphoto(llpDTO.getSignadharphoto());
    	llp.setResidentsignaddress(llpDTO.getResidentsignaddress());
    	llp.setSignphoto(llp.getSignphoto());
    	
    	llp.setBusinessactivity(llpDTO.getBusinessactivity());
    	llp.setHsn1(llpDTO.getHsn1());
    	llp.setHsn2(llpDTO.getHsn2());
    	llp.setHsn3(llpDTO.getHsn3());
    	llp.setHsn4(llpDTO.getHsn4());
    	llp.setHsn5(llpDTO.getHsn5());
    	llp.setAccountname(llpDTO.getAccountname());
    	llp.setAccountnumber(llpDTO.getAccountnumber());
    	llp.setIfsc(llpDTO.getIfsc());
    	llp.setBranchcode(llpDTO.getBranchcode());
    	llp.setBranchname(llpDTO.getBranchname());
    	llp.setCancelcheqphoto(llpDTO.getCancelcheqphoto());
    	llp.setTradelicensenumber(llpDTO.getTradelicensenumber());
    	llp.setTradelicensephoto(llpDTO.getTradelicensephoto());
    	llp.setIsActive(llpDTO.getIsActive());
    	llp.setCreatedBy(llpDTO.getCreatedBy());
    	llp.setCreatedOn(llpDTO.getCreatedOn());
    	llp.setModifiedBy(llpDTO.getModifiedBy());
    	llp.setModifiedOn(llpDTO.getModifiedOn());
    	llp.setStatus(llpDTO.getStatus());
    	llp.setRemark(llpDTO.getRemark());    	
        return llp;
    }

	public static ProprietorshipDTO mapToDto(Proprietorship companyDetails) {
		ProprietorshipDTO companyDetailsDTO = new ProprietorshipDTO();
		companyDetailsDTO.setProprietorshipid(companyDetails.getProprietorshipid());
		companyDetailsDTO.setPersonName(companyDetails.getPersonName());
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
		
		companyDetailsDTO.setPropfatherName(companyDetails.getPropfatherName());
		companyDetailsDTO.setPropadharnumber(companyDetails.getPropadharnumber());
		companyDetailsDTO.setPropadharphoto(companyDetails.getPropadharphoto());
		companyDetailsDTO.setResident_address(companyDetails.getResident_address());
		companyDetailsDTO.setPhoto(companyDetails.getPhoto());
		companyDetailsDTO.setAuthsignname(companyDetails.getAuthsignname());
		companyDetailsDTO.setSignfathername(companyDetails.getSignfathername());
		companyDetailsDTO.setSignadharnumber(companyDetails.getSignadharnumber());
		companyDetailsDTO.setSignadharphoto(companyDetails.getSignadharphoto());
		companyDetailsDTO.setResidentsignaddress(companyDetails.getResidentsignaddress());
		companyDetailsDTO.setSignphoto(companyDetails.getSignphoto());
		
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
