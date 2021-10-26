package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.PartnershipDTO;
import com.nextsaa.gstspiraea.entity.Partnership;

public class PartnershipDetailsMapper {

    public static Partnership mapToEntity(PartnershipDTO llpDTO) {
        Partnership partnership = new Partnership();
        partnership.setPartnershipid(llpDTO.getPartnershipid());
        partnership.setFirmName(llpDTO.getFirmName());
        partnership.setLegalbusinessName(llpDTO.getLegalbusinessName());
        partnership.setTradeName(llpDTO.getTradeName());
        partnership.setMobile(llpDTO.getMobile());
        partnership.setEmail(llpDTO.getEmail());
        partnership.setPannumber(llpDTO.getPannumber());
        partnership.setPanphoto(llpDTO.getPanphoto());
        partnership.setComposition(llpDTO.getComposition());
        partnership.setCommencementDate(llpDTO.getCommencementDate());
        partnership.setPrincipleplace(llpDTO.getPrincipleplace());
        partnership.setPricipleelectricityphoto(llpDTO.getPricipleelectricityphoto());
        partnership.setPriciplerentphoto(llpDTO.getPriciplerentphoto());
        partnership.setPriciplenocphoto(llpDTO.getPriciplenocphoto());
        partnership.setAdditionalplace(llpDTO.getAdditionalplace());
        partnership.setAdditionalelectricityphoto(llpDTO.getAdditionalelectricityphoto());
        partnership.setAdditionalrentphoto(llpDTO.getAdditionalelectricityphoto());
        partnership.setAdditionalnocphoto(llpDTO.getAdditionalnocphoto());
        partnership.setBusinessactivity(llpDTO.getBusinessactivity());
        partnership.setHsn1(llpDTO.getHsn1());
        partnership.setHsn2(llpDTO.getHsn2());
        partnership.setHsn3(llpDTO.getHsn3());
        partnership.setHsn4(llpDTO.getHsn4());
        partnership.setHsn5(llpDTO.getHsn5());
        partnership.setAccountname(llpDTO.getAccountname());
        partnership.setAccountnumber(llpDTO.getAccountnumber());
        partnership.setIfsc(llpDTO.getIfsc());
        partnership.setBranchcode(llpDTO.getBranchcode());
        partnership.setBranchname(llpDTO.getBranchname());
        partnership.setCancelcheqphoto(llpDTO.getCancelcheqphoto());
        partnership.setTradelicensenumber(llpDTO.getTradelicensenumber());
        partnership.setTradelicensephoto(llpDTO.getTradelicensephoto());
        partnership.setActive(llpDTO.isActive());
        partnership.setCreatedBy(llpDTO.getCreatedBy());
        partnership.setCreatedOn(llpDTO.getCreatedOn());
        partnership.setModifiedBy(llpDTO.getModifiedBy());
        partnership.setModifiedOn(llpDTO.getModifiedOn());
        partnership.setStatus(llpDTO.getStatus());
        partnership.setRemark(llpDTO.getRemark());

        partnership.setTrading(llpDTO.isTrading());
        partnership.setManufacture(llpDTO.isManufacture());
        partnership.setService(llpDTO.isService());
        partnership.setPartnerName(llpDTO.getPartnerName());
        partnership.setPartnerFatherName(llpDTO.getPartnerFatherName());
        partnership.setPartneradharnumber(llpDTO.getPartneradharnumber());
        partnership.setPartneradharphoto(llpDTO.getPartneradharphoto());
        partnership.setResidentialAddress(llpDTO.getResidentialAddress());
        partnership.setPartnerPassportPhoto(llpDTO.getPartnerPassportPhoto());
        return partnership;
    }

    public static PartnershipDTO mapToDto(Partnership companyDetails) {
        PartnershipDTO companyDetailsDTO = new PartnershipDTO();
        companyDetailsDTO.setPartnershipid(companyDetails.getPartnershipid());
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
        companyDetailsDTO.setActive(companyDetails.isActive());
        companyDetailsDTO.setCreatedBy(companyDetails.getCreatedBy());
        companyDetailsDTO.setCreatedOn(companyDetails.getCreatedOn());
        companyDetailsDTO.setModifiedBy(companyDetails.getModifiedBy());
        companyDetailsDTO.setModifiedOn(companyDetails.getModifiedOn());
        companyDetailsDTO.setStatus(companyDetails.getStatus());
        companyDetailsDTO.setRemark(companyDetails.getRemark());
        companyDetailsDTO.setTrading(companyDetails.isTrading());
        companyDetailsDTO.setManufacture(companyDetails.isManufacture());
        companyDetailsDTO.setService(companyDetails.isService());
        companyDetailsDTO.setPartnerName(companyDetails.getPartnerName());
        companyDetailsDTO.setPartnerFatherName(companyDetails.getPartnerFatherName());
        companyDetailsDTO.setPartneradharnumber(companyDetails.getPartneradharnumber());
        companyDetailsDTO.setPartneradharphoto(companyDetails.getPartneradharphoto());
        companyDetailsDTO.setResidentialAddress(companyDetails.getResidentialAddress());
        companyDetailsDTO.setPartnerPassportPhoto(companyDetails.getPartnerPassportPhoto());
        return companyDetailsDTO;
    }

}
