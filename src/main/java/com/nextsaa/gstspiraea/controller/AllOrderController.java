package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.UserDetails;
import com.nextsaa.gstspiraea.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @GetMapping(value = {"/All", "/All/{agentLoginName}"})
    public List<Object> getAll(@PathVariable(required = false) String agentLoginName) {

        if (agentLoginName != null) {
            List<UserDetails> userList = userDetailsRepository.findAllByAssignedToAgent(agentLoginName);
            List<Object> response = new ArrayList<>();
            response.addAll(proprietorshipRepostiory.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            response.addAll(partnershipRepository.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            response.addAll(llpRepostiory.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            response.addAll(companyDetailsRepository.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            return response;
        } else {
            List<Object> response = new ArrayList<>();
            response.addAll(proprietorshipRepostiory.findAll());
            response.addAll(partnershipRepository.findAll());
            response.addAll(llpRepostiory.findAll());
            response.addAll(companyDetailsRepository.findAll());
            return response;
        }

    }

    @GetMapping(value = {"/Proprietorship", "/Proprietorship/{agentLoginName}"})
    public List<Object> getAllProprietorship(@PathVariable(required = false) String agentLoginName, @RequestParam Map<String, String> params) {
        if (agentLoginName != null) {
            List<UserDetails> userList = userDetailsRepository.findAllByAssignedToAgent(agentLoginName);
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(proprietorshipRepostiory.findAllByCreatedByInAndProprietorshipidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                        userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList()), params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(proprietorshipRepostiory.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            }
            return response;
        } else {
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(proprietorshipRepostiory.findAllByProprietorshipidLikeOrTradeNameLikeOrLegalbusinessNameLike(params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(proprietorshipRepostiory.findAll());
            }
            return response;
        }

    }

    @GetMapping(value = {"/Partnership", "/Partnership/{agentLoginName}"})
    public List<Object> getAllPartnership(@PathVariable(required = false) String agentLoginName, @RequestParam Map<String, String> params) {
        if (agentLoginName != null) {
            List<UserDetails> userList = userDetailsRepository.findAllByAssignedToAgent(agentLoginName);
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(partnershipRepository.findAllByCreatedByInAndPartnershipidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                        userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList()), params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(partnershipRepository.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            }
            return response;
        } else {
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(partnershipRepository.findAllByPartnershipidLikeOrTradeNameLikeOrLegalbusinessNameLike(params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(partnershipRepository.findAll());
            }
            return response;
        }
    }

    @GetMapping(value = {"/LLP", "/LLP/{agentLoginName}"})
    public List<Object> getAllLLP(@PathVariable(required = false) String agentLoginName, @RequestParam Map<String, String> params) {
        if (agentLoginName != null) {
            List<UserDetails> userList = userDetailsRepository.findAllByAssignedToAgent(agentLoginName);
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(llpRepostiory.findAllByCreatedByInAndLlpidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                        userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList()), params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(llpRepostiory.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            }
            return response;
        } else {
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(llpRepostiory.findAllByLlpidLikeOrTradeNameLikeOrLegalbusinessNameLike(params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(llpRepostiory.findAll());
            }
            return response;
        }

    }

    @GetMapping(value = {"/Company", "/Company/{agentLoginName}"})
    public List<Object> getAllCompany(@PathVariable(required = false) String agentLoginName, @RequestParam Map<String, String> params) {
        if (agentLoginName != null) {
            List<UserDetails> userList = userDetailsRepository.findAllByAssignedToAgent(agentLoginName);
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(companyDetailsRepository.findAllByCreatedByInAndCompanydetailsidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                        userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList()), params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(companyDetailsRepository.findAllByCreatedByIn(userList.stream().map(UserDetails::getLoginUserName).collect(Collectors.toList())));
            }
            return response;
        } else {
            List<Object> response = new ArrayList<>();
            if (params != null && params.size() > 0) {
                response.addAll(companyDetailsRepository.findAllByCompanydetailsidLikeOrTradeNameLikeOrLegalbusinessNameLike(params.get("searchText"), params.get("searchText"), params.get("searchText")));
            } else {
                response.addAll(companyDetailsRepository.findAll());
            }
            return response;
        }
    }
}
