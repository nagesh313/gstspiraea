package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.dto.CompanyDetailsDTO;
import com.nextsaa.gstspiraea.dto.LLPDTO;
import com.nextsaa.gstspiraea.dto.PartnershipDTO;
import com.nextsaa.gstspiraea.dto.ProprietorshipDTO;
import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import com.nextsaa.gstspiraea.mapper.CompanyDetailsMapper;
import com.nextsaa.gstspiraea.mapper.LLPDetailsMapper;
import com.nextsaa.gstspiraea.mapper.PartnershipDetailsMapper;
import com.nextsaa.gstspiraea.mapper.ProprietoshipDetailsMapper;
import com.nextsaa.gstspiraea.repository.*;
import com.nextsaa.gstspiraea.service.ConfigService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

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

    @Autowired
    private DirectorRepository directorRepository;
    @Autowired
    private PartnerRepository partnerRepository;
    @Autowired
    private ConfigService configService;

    @PostMapping(value = "/save-submit-proprietorship")
    public void saveSubmitProprietorship(@RequestBody ProprietorshipDTO dto) throws Exception {
        Proprietorship entity = ProprietoshipDetailsMapper.mapToEntity(dto);
        entity.setStatus("SAVED");
        proprietorshipRepostiory.save(entity);
    }

    @PostMapping(value = "/save-submit-partnership")
    public void saveSubmitPartnership(@RequestBody PartnershipDTO partnershipDTO) throws Exception {
        Partnership entity = PartnershipDetailsMapper.mapToEntity(partnershipDTO);
        partnerRepository.saveAll(entity.getPartnerList());
        entity.setStatus("SAVED");
        partnershipRepository.save(entity);
    }

    @PostMapping(value = "/save-submit-llp")
    public void saveSubmitLLP(@RequestBody LLPDTO llpdto) throws Exception {
        LLP entity = LLPDetailsMapper.mapToEntity(llpdto);
        partnerRepository.saveAll(entity.getPartnerList());
        entity.setStatus("SAVED");
        llpRepostiory.save(entity);
    }

    @PostMapping(value = "/save-submit-company-details")
    public void saveSubmitCompanyDetails(@RequestBody CompanyDetailsDTO companyDetailsDTO) throws Exception {
        CompanyDetails entity = CompanyDetailsMapper.mapToEntity(companyDetailsDTO);
        directorRepository.saveAll(entity.getDirectorList());
        entity.setStatus("SAVED");
        companyDetailsRepository.save(entity);
    }


    @PostMapping(value = "/submit-proprietorship")
    public void submitProprietorship(@RequestBody ProprietorshipDTO dto) throws Exception {
        createOrderProprietorship(dto);
        proprietorshipRepostiory.save(ProprietoshipDetailsMapper.mapToEntity(dto));
    }

    @PostMapping(value = "/submit-partnership")
    public void submitPartnership(@RequestBody PartnershipDTO partnershipDTO) throws Exception {
        createOrderPartnership(partnershipDTO);
        Partnership entity = PartnershipDetailsMapper.mapToEntity(partnershipDTO);
        partnerRepository.saveAll(entity.getPartnerList());
        partnershipRepository.save(entity);
    }

    @PostMapping(value = "/submit-llp")
    public void submitLLP(@RequestBody LLPDTO llpdto) throws Exception {
        createOrderLLP(llpdto);
        LLP entity = LLPDetailsMapper.mapToEntity(llpdto);
        partnerRepository.saveAll(entity.getPartnerList());
        llpRepostiory.save(entity);
    }

    @PostMapping(value = "/submit-company-details")
    public void submitCompanyDetails(@RequestBody CompanyDetailsDTO companyDetailsDTO) throws Exception {
        createOrderCompany(companyDetailsDTO);
        CompanyDetails entity = CompanyDetailsMapper.mapToEntity(companyDetailsDTO);
        directorRepository.saveAll(entity.getDirectorList());
        companyDetailsRepository.save(entity);
    }

    private void createOrderProprietorship(ProprietorshipDTO dto) throws Exception {
        dto.setStatus("CREATED");
        dto.setRazorpayOrder(createOrder(
                dto.getPaymentPlanLocationDetails().getPayplanamount()
        ));
    }

    private void createOrderLLP(LLPDTO dto) throws Exception {
        dto.setStatus("CREATED");

        dto.setRazorpayOrder(createOrder(dto.getPaymentPlanLocationDetails().getPayplanamount()));
    }

    private void createOrderPartnership(PartnershipDTO dto) throws Exception {
        dto.setStatus("CREATED");
        dto.setRazorpayOrder(createOrder(dto.getPaymentPlanLocationDetails().getPayplanamount()));
    }

    private void createOrderCompany(CompanyDetailsDTO dto) throws Exception {
        dto.setStatus("CREATED");
        dto.setRazorpayOrder(createOrder(dto.getPaymentPlanLocationDetails().getPayplanamount()));
    }

    private String createOrder(Double amount) throws Exception {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(
                    configService.getConfigByKey("payment.razorpay.key").getConfigvalue(),
                    configService.getConfigByKey("payment.razorpay.secret").getConfigvalue());
            JSONObject orderRequest = new JSONObject();

            Double feeAmountC = amount * 100;
            Double transactionFeesC = 2 * (feeAmountC) / 100;
            orderRequest.put("amount", feeAmountC + transactionFeesC); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", generatedOrder());
            Order order = razorpayClient.Orders.create(orderRequest);
            return order.toString();

        } catch (RazorpayException e) {
            System.out.println(e.getMessage());
            throw new Exception("Unable to create Razor Pay Order");
        }
    }

    public String generatedOrder() {
        Date dNow = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("yyMMddhhmmssMs");
        String datetime = ft.format(dNow);
        System.out.println(datetime);
        return "Order-" + datetime;
    }
}
