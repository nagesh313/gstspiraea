package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.dto.CompanyDetailsDTO;
import com.nextsaa.gstspiraea.dto.LLPDTO;
import com.nextsaa.gstspiraea.dto.PartnershipDTO;
import com.nextsaa.gstspiraea.dto.ProprietorshipDTO;
import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import com.nextsaa.gstspiraea.mapper.*;
import com.nextsaa.gstspiraea.repository.CompanyDetailsRepository;
import com.nextsaa.gstspiraea.repository.LLPRepostiory;
import com.nextsaa.gstspiraea.repository.PartnershipRepository;
import com.nextsaa.gstspiraea.repository.ProprietorshipRepostiory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/get-order")
@Slf4j
public class OrderController {
    @Autowired
    private ProprietorshipRepostiory proprietorshipRepostiory;
    @Autowired
    private PartnershipRepository partnershipRepository;
    @Autowired
    private LLPRepostiory llpRepostiory;
    @Autowired
    private CompanyDetailsRepository companyDetailsRepository;


    @GetMapping(value = "/Proprietorship/{user}")
    public List<ProprietorshipDTO> getAllProprietorship(@PathVariable String user) {
        return proprietorshipRepostiory.findAllByCreatedBy(user).stream().map(entity -> ProprietoshipDetailsMapper.mapToDto(entity)).collect(Collectors.toList());
    }

    @GetMapping(value = "/Partnership/{user}")
    public List<PartnershipDTO> getAllPartnership(@PathVariable String user) {
        return partnershipRepository.findAllByCreatedBy(user).stream().map(entity -> PartnershipDetailsMapper.mapToDto(entity)).collect(Collectors.toList());
    }

    @GetMapping(value = "/LLP/{user}")
    public List<LLPDTO> getAllLLP(@PathVariable String user) {
        return llpRepostiory.findAllByCreatedBy(user).stream().map(entity -> LLPDetailsMapper.mapToDto(entity)).collect(Collectors.toList());

    }

    @GetMapping(value = "/Company/{user}")
    public List<CompanyDetailsDTO> getAllCompany(@PathVariable String user) {
        return companyDetailsRepository.findAllByCreatedBy(user).stream().map(entity -> CompanyDetailsMapper.mapToDto(entity)).collect(Collectors.toList());
    }

    @GetMapping(value = "/get/Proprietorship/{id}")
    public ProprietorshipDTO getProprietorshipById(@PathVariable Long id) {
        Optional<Proprietorship> entity = proprietorshipRepostiory.findById(id);
        if (entity.isPresent()) {
            return ProprietoshipDetailsMapper.mapToDto(entity.get());
        }
        return null;
    }

    @GetMapping(value = "/get/Partnership/{id}")
    public PartnershipDTO getPartnershipById(@PathVariable Long id) {
        Optional<Partnership> entity = partnershipRepository.findById(id);
        if (entity.isPresent()) {
            return PartnershipDetailsMapper.mapToDto(entity.get());
        }
        return null;
    }

    @GetMapping(value = "/get/LLP/{id}")
    public LLPDTO getLLPById(@PathVariable Long id) {
        Optional<LLP> entity = llpRepostiory.findById(id);
        if (entity.isPresent()) {
            return LLPDetailsMapper.mapToDto(entity.get());
        }
        return null;
    }

    @GetMapping(value = "/get/Company/{id}")
    public CompanyDetailsDTO getCompanyById(@PathVariable Long id) {
        Optional<CompanyDetails> entity = companyDetailsRepository.findById(id);
        if (entity.isPresent()) {
            return CompanyDetailsMapper.mapToDto(entity.get());
        }
        return null;
    }

    @GetMapping(value = "/{type}/{id}/{status}")
    public void approveOrder(@PathVariable String type, @PathVariable Long id, @PathVariable String status) {
        switch (type) {
            case "Proprietorship":
                Optional<Proprietorship> entity1 = proprietorshipRepostiory.findById(id);
                if (entity1.isPresent()) {
                    Proprietorship object = entity1.get();
                    object.setStatus(status);
                    proprietorshipRepostiory.save(object);
                }
                break;
            case "Partnership":
                Optional<Partnership> entity2 = partnershipRepository.findById(id);
                if (entity2.isPresent()) {
                    Partnership object = entity2.get();
                    object.setStatus(status);
                    partnershipRepository.save(object);
                }
                break;
            case "LLP":
                Optional<LLP> entity3 = llpRepostiory.findById(id);
                if (entity3.isPresent()) {
                    LLP object = entity3.get();
                    object.setStatus(status);
                    llpRepostiory.save(object);
                }
                break;
            case "Company":
                Optional<CompanyDetails> entity4 = companyDetailsRepository.findById(id);
                if (entity4.isPresent()) {
                    CompanyDetails object = entity4.get();
                    object.setStatus(status);
                    companyDetailsRepository.save(object);
                }
                break;


        }
    }

    //          .get("/api/document/gst/" + orderType + "/" + id + "/" + documentUrl)

    @GetMapping(value = "/gst/{type}/{id}/{documentURL}")
    public void updateGSTDocument(@PathVariable String type, @PathVariable Long id, @PathVariable String documentURL) {
        switch (type) {
            case "Proprietorship":
                Optional<Proprietorship> entity1 = proprietorshipRepostiory.findById(id);
                if (entity1.isPresent()) {
                    Proprietorship object = entity1.get();
                    object.setGstDocument(documentURL);
                    proprietorshipRepostiory.save(object);
                }
                break;
            case "Partnership":
                Optional<Partnership> entity2 = partnershipRepository.findById(id);
                if (entity2.isPresent()) {
                    Partnership object = entity2.get();
                    object.setGstDocument(documentURL);
                    partnershipRepository.save(object);
                }
                break;
            case "LLP":
                Optional<LLP> entity3 = llpRepostiory.findById(id);
                if (entity3.isPresent()) {
                    LLP object = entity3.get();
                    object.setGstDocument(documentURL);
                    llpRepostiory.save(object);
                }
                break;
            case "Company":
                Optional<CompanyDetails> entity4 = companyDetailsRepository.findById(id);
                if (entity4.isPresent()) {
                    CompanyDetails object = entity4.get();
                    object.setGstDocument(documentURL);
                    companyDetailsRepository.save(object);
                }
                break;


        }
    }


}
