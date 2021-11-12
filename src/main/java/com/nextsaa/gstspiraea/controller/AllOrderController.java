package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import com.nextsaa.gstspiraea.repository.CompanyDetailsRepository;
import com.nextsaa.gstspiraea.repository.LLPRepostiory;
import com.nextsaa.gstspiraea.repository.PartnershipRepository;
import com.nextsaa.gstspiraea.repository.ProprietorshipRepostiory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping(value = "/All")
    public List<Object> getAll() {
        List<Object> response = new ArrayList<>();
        response.addAll(proprietorshipRepostiory.findAll());
        response.addAll(partnershipRepository.findAll());
        response.addAll(llpRepostiory.findAll());
        response.addAll(companyDetailsRepository.findAll());
        return response;
    }

    @GetMapping(value = "/Proprietorship")
    public List<Proprietorship> getAllProprietorship() {
        return proprietorshipRepostiory.findAll();
    }

    @GetMapping(value = "/Partnership")
    public List<Partnership> getAllPartnership() {
        return partnershipRepository.findAll();
    }

    @GetMapping(value = "/LLP")
    public List<LLP> getAllLLP() {
        return llpRepostiory.findAll();

    }

    @GetMapping(value = "/Company")
    public List<CompanyDetails> getAllCompany() {
        return companyDetailsRepository.findAll();

    }
}
