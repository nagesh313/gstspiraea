package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.dto.*;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Slf4j
public class FormController {
    @Autowired
    private ProprietorshipRepostiory proprietorshipRepostiory;
    @Autowired
    private PartnershipRepository partnershipRepository;
    @Autowired
    private LLPRepostiory llpRepostiory;
    @Autowired
    private CompanyDetailsRepository companyDetailsRepository;


    @PostMapping(value = "/submit-proprietorship")
    public void submitProprietorship(@RequestBody ProprietorshipDTO dto) {
        proprietorshipRepostiory.save(ProprietoshipDetailsMapper.mapToEntity(dto));
    }

    @PostMapping(value = "/submit-partnership")
    public void submitPartnership(@RequestBody PartnershipDTO dto) {
        partnershipRepository.save(PartnershipDetailsMapper.mapToEntity(dto));
    }

    @PostMapping(value = "/submit-llp")
    public void submitLLP(@RequestBody LLPDTO dto) {
        llpRepostiory.save(LLPDetailsMapper.mapToEntity(dto));
    }

    @PostMapping(value = "/submit-company-details")
    public void submitCompanyDetails(@RequestBody CompanyDetailsDTO dto) {
        companyDetailsRepository.save(CompanyDetailsMapper.mapToEntity(dto));
    }
}
