package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.dto.CompanyDetailsDTO;
import com.nextsaa.gstspiraea.dto.LLPDTO;
import com.nextsaa.gstspiraea.dto.PartnershipDTO;
import com.nextsaa.gstspiraea.dto.ProprietorshipDTO;
import com.nextsaa.gstspiraea.mapper.CompanyDetailsMapper;
import com.nextsaa.gstspiraea.mapper.LLPDetailsMapper;
import com.nextsaa.gstspiraea.mapper.PartnershipDetailsMapper;
import com.nextsaa.gstspiraea.mapper.ProprietoshipDetailsMapper;
import com.nextsaa.gstspiraea.repository.CompanyDetailsRepository;
import com.nextsaa.gstspiraea.repository.LLPRepostiory;
import com.nextsaa.gstspiraea.repository.PartnershipRepository;
import com.nextsaa.gstspiraea.repository.ProprietorshipRepostiory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/get-all-order")
@Slf4j
public class AllOrderController {
    @Autowired
    private ProprietorshipRepostiory proprietorshipRepostiory;
    @Autowired
    private PartnershipRepository partnershipRepository;
    @Autowired
    private LLPRepostiory llpRepostiory;
    @Autowired
    private CompanyDetailsRepository companyDetailsRepository;


    @GetMapping(value = "/Proprietorship")
    public List<ProprietorshipDTO> getAllProprietorship() {
        return proprietorshipRepostiory.findAll().stream().map(entity -> ProprietoshipDetailsMapper.mapToDto(entity)).collect(Collectors.toList());
    }

    @GetMapping(value = "/Partnership")
    public List<PartnershipDTO> getAllPartnership() {
        return partnershipRepository.findAll().stream().map(entity -> PartnershipDetailsMapper.mapToDto(entity)).collect(Collectors.toList());
    }

    @GetMapping(value = "/LLP")
    public List<LLPDTO> getAllLLP() {
        return llpRepostiory.findAll().stream().map(entity -> LLPDetailsMapper.mapToDto(entity)).collect(Collectors.toList());

    }

    @GetMapping(value = "/Company")
    public List<CompanyDetailsDTO> getAllCompany() {
        return companyDetailsRepository.findAll().stream().map(entity -> CompanyDetailsMapper.mapToDto(entity)).collect(Collectors.toList());

    }
}
