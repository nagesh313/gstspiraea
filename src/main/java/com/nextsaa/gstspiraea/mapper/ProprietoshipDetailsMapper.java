package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.ProprietorshipDTO;

import com.nextsaa.gstspiraea.entity.Proprietorship;

public class ProprietoshipDetailsMapper {

    public static Proprietorship mapToEntity(ProprietorshipDTO proprietorshipDTO) {
        Proprietorship proprietorship = new Proprietorship();
        proprietorship.setProprietorshipid(proprietorshipDTO.getProprietorshipid());
        proprietorship.setPersonName(proprietorshipDTO.getPersonName());
        proprietorship.setLegalbusinessName(proprietorshipDTO.getLegalbusinessName());
        proprietorship.setTradeName(proprietorshipDTO.getTradeName());
        proprietorship.setMobile(proprietorshipDTO.getMobile());
        proprietorship.setEmail(proprietorshipDTO.getEmail());
        proprietorship.setPannumber(proprietorshipDTO.getPannumber());
        proprietorship.setPanphoto(proprietorshipDTO.getPanphoto());
        proprietorship.setComposition(proprietorshipDTO.getComposition());
        proprietorship.setCommencementDate(proprietorshipDTO.getCommencementDate());
        proprietorship.setPrincipleplace(proprietorshipDTO.getPrincipleplace());
        proprietorship.setPricipleelectricityphoto(proprietorshipDTO.getPricipleelectricityphoto());
        proprietorship.setPriciplerentphoto(proprietorshipDTO.getPriciplerentphoto());
        proprietorship.setPriciplenocphoto(proprietorshipDTO.getPriciplenocphoto());
        proprietorship.setAdditionalplace(proprietorshipDTO.getAdditionalplace());
        proprietorship.setAdditionalelectricityphoto(proprietorshipDTO.getAdditionalelectricityphoto());
        proprietorship.setAdditionalrentphoto(proprietorshipDTO.getAdditionalelectricityphoto());
        proprietorship.setAdditionalnocphoto(proprietorshipDTO.getAdditionalnocphoto());

        proprietorship.setPropfatherName(proprietorshipDTO.getPropfatherName());
        proprietorship.setPropadharnumber(proprietorshipDTO.getPropadharnumber());
        proprietorship.setPropadharphoto(proprietorshipDTO.getPropadharphoto());
        proprietorship.setResident_address(proprietorshipDTO.getResident_address());
        proprietorship.setPhoto(proprietorshipDTO.getPhoto());
        proprietorship.setAuthsignname(proprietorshipDTO.getAuthsignname());
        proprietorship.setSignfathername(proprietorshipDTO.getSignfathername());
        proprietorship.setSignadharnumber(proprietorshipDTO.getSignadharnumber());
        proprietorship.setSignadharphoto(proprietorshipDTO.getSignadharphoto());
        proprietorship.setResidentsignaddress(proprietorshipDTO.getResidentsignaddress());
        proprietorship.setSignphoto(proprietorship.getSignphoto());

        proprietorship.setBusinessactivity(proprietorshipDTO.getBusinessactivity());
        proprietorship.setHsn1(proprietorshipDTO.getHsn1());
        proprietorship.setHsn2(proprietorshipDTO.getHsn2());
        proprietorship.setHsn3(proprietorshipDTO.getHsn3());
        proprietorship.setHsn4(proprietorshipDTO.getHsn4());
        proprietorship.setHsn5(proprietorshipDTO.getHsn5());
        proprietorship.setAccountname(proprietorshipDTO.getAccountname());
        proprietorship.setAccountnumber(proprietorshipDTO.getAccountnumber());
        proprietorship.setIfsc(proprietorshipDTO.getIfsc());
        proprietorship.setBranchcode(proprietorshipDTO.getBranchcode());
        proprietorship.setBranchname(proprietorshipDTO.getBranchname());
        proprietorship.setCancelcheqphoto(proprietorshipDTO.getCancelcheqphoto());
        proprietorship.setTradelicensenumber(proprietorshipDTO.getTradelicensenumber());
        proprietorship.setTradelicensephoto(proprietorshipDTO.getTradelicensephoto());
        proprietorship.setActive(proprietorshipDTO.isActive());
        proprietorship.setCreatedBy(proprietorshipDTO.getCreatedBy());
        proprietorship.setModifiedBy(proprietorshipDTO.getModifiedBy());
        proprietorship.setStatus(proprietorshipDTO.getStatus());
        proprietorship.setGstDocument(proprietorshipDTO.getGstDocument());

        proprietorship.setRemark(proprietorshipDTO.getRemark());
        proprietorship.setTrading(proprietorshipDTO.isTrading());
        proprietorship.setManufacture(proprietorshipDTO.isManufacture());
        proprietorship.setService(proprietorshipDTO.isService());
        proprietorship.setRazorpayOrder(proprietorshipDTO.getRazorpayOrder());
        proprietorship.setPaymentPlanLocationDetails(proprietorshipDTO.getPaymentPlanLocationDetails());

        return proprietorship;
    }

    public static ProprietorshipDTO mapToDto(Proprietorship proprietorshipDetails) {
        ProprietorshipDTO proprietorshipDTO = new ProprietorshipDTO();
        proprietorshipDTO.setProprietorshipid(proprietorshipDetails.getProprietorshipid());
        proprietorshipDTO.setPersonName(proprietorshipDetails.getPersonName());
        proprietorshipDTO.setLegalbusinessName(proprietorshipDetails.getLegalbusinessName());
        proprietorshipDTO.setTradeName(proprietorshipDetails.getTradeName());
        proprietorshipDTO.setMobile(proprietorshipDetails.getMobile());
        proprietorshipDTO.setEmail(proprietorshipDetails.getEmail());
        proprietorshipDTO.setPannumber(proprietorshipDetails.getPannumber());
        proprietorshipDTO.setPanphoto(proprietorshipDetails.getPanphoto());
        proprietorshipDTO.setComposition(proprietorshipDetails.getComposition());
        proprietorshipDTO.setCommencementDate(proprietorshipDetails.getCommencementDate());
        proprietorshipDTO.setPrincipleplace(proprietorshipDetails.getPrincipleplace());
        proprietorshipDTO.setPricipleelectricityphoto(proprietorshipDetails.getPricipleelectricityphoto());
        proprietorshipDTO.setPriciplerentphoto(proprietorshipDetails.getPriciplerentphoto());
        proprietorshipDTO.setPriciplenocphoto(proprietorshipDetails.getPriciplenocphoto());
        proprietorshipDTO.setAdditionalplace(proprietorshipDetails.getAdditionalplace());
        proprietorshipDTO.setAdditionalelectricityphoto(proprietorshipDetails.getAdditionalelectricityphoto());
        proprietorshipDTO.setAdditionalrentphoto(proprietorshipDetails.getAdditionalelectricityphoto());
        proprietorshipDTO.setAdditionalnocphoto(proprietorshipDetails.getAdditionalnocphoto());

        proprietorshipDTO.setPropfatherName(proprietorshipDetails.getPropfatherName());
        proprietorshipDTO.setPropadharnumber(proprietorshipDetails.getPropadharnumber());
        proprietorshipDTO.setPropadharphoto(proprietorshipDetails.getPropadharphoto());
        proprietorshipDTO.setResident_address(proprietorshipDetails.getResident_address());
        proprietorshipDTO.setPhoto(proprietorshipDetails.getPhoto());
        proprietorshipDTO.setAuthsignname(proprietorshipDetails.getAuthsignname());
        proprietorshipDTO.setSignfathername(proprietorshipDetails.getSignfathername());
        proprietorshipDTO.setSignadharnumber(proprietorshipDetails.getSignadharnumber());
        proprietorshipDTO.setSignadharphoto(proprietorshipDetails.getSignadharphoto());
        proprietorshipDTO.setResidentsignaddress(proprietorshipDetails.getResidentsignaddress());
        proprietorshipDTO.setSignphoto(proprietorshipDetails.getSignphoto());

        proprietorshipDTO.setBusinessactivity(proprietorshipDetails.getBusinessactivity());
        proprietorshipDTO.setHsn1(proprietorshipDetails.getHsn1());
        proprietorshipDTO.setHsn2(proprietorshipDetails.getHsn2());
        proprietorshipDTO.setHsn3(proprietorshipDetails.getHsn3());
        proprietorshipDTO.setHsn4(proprietorshipDetails.getHsn4());
        proprietorshipDTO.setHsn5(proprietorshipDetails.getHsn5());
        proprietorshipDTO.setAccountname(proprietorshipDetails.getAccountname());
        proprietorshipDTO.setAccountnumber(proprietorshipDetails.getAccountnumber());
        proprietorshipDTO.setIfsc(proprietorshipDetails.getIfsc());
        proprietorshipDTO.setBranchcode(proprietorshipDetails.getBranchcode());
        proprietorshipDTO.setBranchname(proprietorshipDetails.getBranchname());
        proprietorshipDTO.setCancelcheqphoto(proprietorshipDetails.getCancelcheqphoto());
        proprietorshipDTO.setTradelicensenumber(proprietorshipDetails.getTradelicensenumber());
        proprietorshipDTO.setTradelicensephoto(proprietorshipDetails.getTradelicensephoto());
        proprietorshipDTO.setActive(proprietorshipDetails.isActive());
        proprietorshipDTO.setCreatedBy(proprietorshipDetails.getCreatedBy());
        proprietorshipDTO.setCreatedOn(proprietorshipDetails.getCreatedOn());
        proprietorshipDTO.setModifiedBy(proprietorshipDetails.getModifiedBy());
        proprietorshipDTO.setModifiedOn(proprietorshipDetails.getModifiedOn());
        proprietorshipDTO.setStatus(proprietorshipDetails.getStatus());
        proprietorshipDTO.setGstDocument(proprietorshipDetails.getGstDocument());

        proprietorshipDTO.setRemark(proprietorshipDetails.getRemark());
        proprietorshipDTO.setTrading(proprietorshipDetails.isTrading());
        proprietorshipDTO.setManufacture(proprietorshipDetails.isManufacture());
        proprietorshipDTO.setService(proprietorshipDetails.isService());
        proprietorshipDTO.setRazorpayOrder(proprietorshipDetails.getRazorpayOrder());
        proprietorshipDTO.setPaymentPlanLocationDetails(proprietorshipDetails.getPaymentPlanLocationDetails());

        return proprietorshipDTO;
    }

}
