package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.LLPDTO;
import com.nextsaa.gstspiraea.entity.LLP;

public class LLPDetailsMapper {

    public static LLP mapToEntity(LLPDTO llpDTO) {
    	LLP llp = new LLP();
    	llp.setLlpid(llpDTO.getLlpid());
    	llp.setFirmName(llpDTO.getFirmName());
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
    	llp.setActive(llpDTO.isActive());
    	llp.setCreatedBy(llpDTO.getCreatedBy());
    	llp.setCreatedOn(llpDTO.getCreatedOn());
    	llp.setModifiedBy(llpDTO.getModifiedBy());
    	llp.setModifiedOn(llpDTO.getModifiedOn());
    	llp.setStatus(llpDTO.getStatus());
    	llp.setRemark(llpDTO.getRemark());

		llp.setTrading(llpDTO.isTrading());
		llp.setManufacture(llpDTO.isManufacture());
		llp.setService(llpDTO.isService());
		llp.setPartnerName(llpDTO.getPartnerName());
		llp.setPartnerFatherName(llpDTO.getPartnerFatherName());
		llp.setPartneradharnumber(llpDTO.getPartneradharnumber());
		llp.setPartneradharphoto(llpDTO.getPartneradharphoto());
		llp.setResidentialAddress(llpDTO.getResidentialAddress());
		llp.setPartnerPassportPhoto(llpDTO.getPartnerPassportPhoto());
		llp.setRazorpayOrder(llpDTO.getRazorpayOrder());
        return llp;
    }

	public static LLPDTO mapToDto(LLP llp) {
		LLPDTO llpDTO = new LLPDTO();
		llpDTO.setLlpid(llp.getLlpid());
		llpDTO.setFirmName(llp.getFirmName());
		llpDTO.setLegalbusinessName(llp.getLegalbusinessName());
		llpDTO.setTradeName(llp.getTradeName());
		llpDTO.setMobile(llp.getMobile());
		llpDTO.setEmail(llp.getEmail());
		llpDTO.setPannumber(llp.getPannumber());
		llpDTO.setPanphoto(llp.getPanphoto());
		llpDTO.setComposition(llp.getComposition());
		llpDTO.setCommencementDate(llp.getCommencementDate());
		llpDTO.setPrincipleplace(llp.getPrincipleplace());
		llpDTO.setPricipleelectricityphoto(llp.getPricipleelectricityphoto());
		llpDTO.setPriciplerentphoto(llp.getPriciplerentphoto());
		llpDTO.setPriciplenocphoto(llp.getPriciplenocphoto());
		llpDTO.setAdditionalplace(llp.getAdditionalplace());
		llpDTO.setAdditionalelectricityphoto(llp.getAdditionalelectricityphoto());
		llpDTO.setAdditionalrentphoto(llp.getAdditionalelectricityphoto());
		llpDTO.setAdditionalnocphoto(llp.getAdditionalnocphoto());
		llpDTO.setBusinessactivity(llp.getBusinessactivity());
		llpDTO.setHsn1(llp.getHsn1());
		llpDTO.setHsn2(llp.getHsn2());
		llpDTO.setHsn3(llp.getHsn3());
		llpDTO.setHsn4(llp.getHsn4());
		llpDTO.setHsn5(llp.getHsn5());
		llpDTO.setAccountname(llp.getAccountname());
		llpDTO.setAccountnumber(llp.getAccountnumber());
		llpDTO.setIfsc(llp.getIfsc());
		llpDTO.setBranchcode(llp.getBranchcode());
		llpDTO.setBranchname(llp.getBranchname());
		llpDTO.setCancelcheqphoto(llp.getCancelcheqphoto());
		llpDTO.setTradelicensenumber(llp.getTradelicensenumber());
		llpDTO.setTradelicensephoto(llp.getTradelicensephoto());
		llpDTO.setActive(llp.isActive());
		llpDTO.setCreatedBy(llp.getCreatedBy());
		llpDTO.setCreatedOn(llp.getCreatedOn());
		llpDTO.setModifiedBy(llp.getModifiedBy());
		llpDTO.setModifiedOn(llp.getModifiedOn());
		llpDTO.setStatus(llp.getStatus());
		llpDTO.setRemark(llp.getRemark());
		llpDTO.setTrading(llp.isTrading());
		llpDTO.setManufacture(llp.isManufacture());
		llpDTO.setService(llp.isService());
		llpDTO.setPartnerName(llp.getPartnerName());
		llpDTO.setPartnerFatherName(llp.getPartnerFatherName());
		llpDTO.setPartneradharnumber(llp.getPartneradharnumber());
		llpDTO.setPartneradharphoto(llp.getPartneradharphoto());
		llpDTO.setResidentialAddress(llp.getResidentialAddress());
		llpDTO.setPartnerPassportPhoto(llp.getPartnerPassportPhoto());
		llpDTO.setRazorpayOrder(llp.getRazorpayOrder());
        return llpDTO;
    }
	
}
