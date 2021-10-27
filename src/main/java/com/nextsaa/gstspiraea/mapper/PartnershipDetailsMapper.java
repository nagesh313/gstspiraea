package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.PartnershipDTO;
import com.nextsaa.gstspiraea.entity.Partnership;

public class PartnershipDetailsMapper {

    public static Partnership mapToEntity(PartnershipDTO partnershipDTO) {
        Partnership partnership = new Partnership();
        partnership.setPartnershipid(partnershipDTO.getPartnershipid());
        partnership.setFirmName(partnershipDTO.getFirmName());
        partnership.setLegalbusinessName(partnershipDTO.getLegalbusinessName());
        partnership.setTradeName(partnershipDTO.getTradeName());
        partnership.setMobile(partnershipDTO.getMobile());
        partnership.setEmail(partnershipDTO.getEmail());
        partnership.setPannumber(partnershipDTO.getPannumber());
        partnership.setPanphoto(partnershipDTO.getPanphoto());
        partnership.setComposition(partnershipDTO.getComposition());
        partnership.setCommencementDate(partnershipDTO.getCommencementDate());
        partnership.setPrincipleplace(partnershipDTO.getPrincipleplace());
        partnership.setPricipleelectricityphoto(partnershipDTO.getPricipleelectricityphoto());
        partnership.setPriciplerentphoto(partnershipDTO.getPriciplerentphoto());
        partnership.setPriciplenocphoto(partnershipDTO.getPriciplenocphoto());
        partnership.setAdditionalplace(partnershipDTO.getAdditionalplace());
        partnership.setAdditionalelectricityphoto(partnershipDTO.getAdditionalelectricityphoto());
        partnership.setAdditionalrentphoto(partnershipDTO.getAdditionalelectricityphoto());
        partnership.setAdditionalnocphoto(partnershipDTO.getAdditionalnocphoto());
        partnership.setBusinessactivity(partnershipDTO.getBusinessactivity());
        partnership.setHsn1(partnershipDTO.getHsn1());
        partnership.setHsn2(partnershipDTO.getHsn2());
        partnership.setHsn3(partnershipDTO.getHsn3());
        partnership.setHsn4(partnershipDTO.getHsn4());
        partnership.setHsn5(partnershipDTO.getHsn5());
        partnership.setAccountname(partnershipDTO.getAccountname());
        partnership.setAccountnumber(partnershipDTO.getAccountnumber());
        partnership.setIfsc(partnershipDTO.getIfsc());
        partnership.setBranchcode(partnershipDTO.getBranchcode());
        partnership.setBranchname(partnershipDTO.getBranchname());
        partnership.setCancelcheqphoto(partnershipDTO.getCancelcheqphoto());
        partnership.setTradelicensenumber(partnershipDTO.getTradelicensenumber());
        partnership.setTradelicensephoto(partnershipDTO.getTradelicensephoto());
        partnership.setActive(partnershipDTO.isActive());
        partnership.setCreatedBy(partnershipDTO.getCreatedBy());
        partnership.setCreatedOn(partnershipDTO.getCreatedOn());
        partnership.setModifiedBy(partnershipDTO.getModifiedBy());
        partnership.setModifiedOn(partnershipDTO.getModifiedOn());
        partnership.setStatus(partnershipDTO.getStatus());
        partnership.setRemark(partnershipDTO.getRemark());

        partnership.setTrading(partnershipDTO.isTrading());
        partnership.setManufacture(partnershipDTO.isManufacture());
        partnership.setService(partnershipDTO.isService());
        partnership.setPartnerName(partnershipDTO.getPartnerName());
        partnership.setPartnerFatherName(partnershipDTO.getPartnerFatherName());
        partnership.setPartneradharnumber(partnershipDTO.getPartneradharnumber());
        partnership.setPartneradharphoto(partnershipDTO.getPartneradharphoto());
        partnership.setResidentialAddress(partnershipDTO.getResidentialAddress());
        partnership.setPartnerPassportPhoto(partnershipDTO.getPartnerPassportPhoto());
        partnership.setRazorpayOrder(partnershipDTO.getRazorpayOrder());
        return partnership;
    }

    public static PartnershipDTO mapToDto(Partnership partnership) {
        PartnershipDTO partnershipDTO = new PartnershipDTO();
        partnershipDTO.setPartnershipid(partnership.getPartnershipid());
        partnershipDTO.setFirmName(partnership.getFirmName());
        partnershipDTO.setLegalbusinessName(partnership.getLegalbusinessName());
        partnershipDTO.setTradeName(partnership.getTradeName());
        partnershipDTO.setMobile(partnership.getMobile());
        partnershipDTO.setEmail(partnership.getEmail());
        partnershipDTO.setPannumber(partnership.getPannumber());
        partnershipDTO.setPanphoto(partnership.getPanphoto());
        partnershipDTO.setComposition(partnership.getComposition());
        partnershipDTO.setCommencementDate(partnership.getCommencementDate());
        partnershipDTO.setPrincipleplace(partnership.getPrincipleplace());
        partnershipDTO.setPricipleelectricityphoto(partnership.getPricipleelectricityphoto());
        partnershipDTO.setPriciplerentphoto(partnership.getPriciplerentphoto());
        partnershipDTO.setPriciplenocphoto(partnership.getPriciplenocphoto());
        partnershipDTO.setAdditionalplace(partnership.getAdditionalplace());
        partnershipDTO.setAdditionalelectricityphoto(partnership.getAdditionalelectricityphoto());
        partnershipDTO.setAdditionalrentphoto(partnership.getAdditionalelectricityphoto());
        partnershipDTO.setAdditionalnocphoto(partnership.getAdditionalnocphoto());
        partnershipDTO.setBusinessactivity(partnership.getBusinessactivity());
        partnershipDTO.setHsn1(partnership.getHsn1());
        partnershipDTO.setHsn2(partnership.getHsn2());
        partnershipDTO.setHsn3(partnership.getHsn3());
        partnershipDTO.setHsn4(partnership.getHsn4());
        partnershipDTO.setHsn5(partnership.getHsn5());
        partnershipDTO.setAccountname(partnership.getAccountname());
        partnershipDTO.setAccountnumber(partnership.getAccountnumber());
        partnershipDTO.setIfsc(partnership.getIfsc());
        partnershipDTO.setBranchcode(partnership.getBranchcode());
        partnershipDTO.setBranchname(partnership.getBranchname());
        partnershipDTO.setCancelcheqphoto(partnership.getCancelcheqphoto());
        partnershipDTO.setTradelicensenumber(partnership.getTradelicensenumber());
        partnershipDTO.setTradelicensephoto(partnership.getTradelicensephoto());
        partnershipDTO.setActive(partnership.isActive());
        partnershipDTO.setCreatedBy(partnership.getCreatedBy());
        partnershipDTO.setCreatedOn(partnership.getCreatedOn());
        partnershipDTO.setModifiedBy(partnership.getModifiedBy());
        partnershipDTO.setModifiedOn(partnership.getModifiedOn());
        partnershipDTO.setStatus(partnership.getStatus());
        partnershipDTO.setRemark(partnership.getRemark());
        partnershipDTO.setTrading(partnership.isTrading());
        partnershipDTO.setManufacture(partnership.isManufacture());
        partnershipDTO.setService(partnership.isService());
        partnershipDTO.setPartnerName(partnership.getPartnerName());
        partnershipDTO.setPartnerFatherName(partnership.getPartnerFatherName());
        partnershipDTO.setPartneradharnumber(partnership.getPartneradharnumber());
        partnershipDTO.setPartneradharphoto(partnership.getPartneradharphoto());
        partnershipDTO.setResidentialAddress(partnership.getResidentialAddress());
        partnershipDTO.setPartnerPassportPhoto(partnership.getPartnerPassportPhoto());
        partnershipDTO.setRazorpayOrder(partnership.getRazorpayOrder());
        return partnershipDTO;
    }

}
