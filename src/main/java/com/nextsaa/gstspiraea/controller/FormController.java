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
    private ConfigService configService;

    @PostMapping(value = "/submit-proprietorship")
    public void submitProprietorship(@RequestBody ProprietorshipDTO dto) throws Exception {
        createOrderProprietorship(dto);
        proprietorshipRepostiory.save(ProprietoshipDetailsMapper.mapToEntity(dto));
    }

    @PostMapping(value = "/submit-partnership")
    public void submitPartnership(@RequestBody PartnershipDTO dto) throws Exception {
        createOrderPartnership(dto);
        partnershipRepository.save(PartnershipDetailsMapper.mapToEntity(dto));
    }

    @PostMapping(value = "/submit-llp")
    public void submitLLP(@RequestBody LLPDTO dto) throws Exception {
        createOrderLLP(dto);
        llpRepostiory.save(LLPDetailsMapper.mapToEntity(dto));
    }

    @PostMapping(value = "/submit-company-details")
    public void submitCompanyDetails(@RequestBody CompanyDetailsDTO dto) throws Exception {
        createOrderCompany(dto);
        companyDetailsRepository.save(CompanyDetailsMapper.mapToEntity(dto));
    }

    private void createOrderProprietorship(ProprietorshipDTO dto) throws Exception {
        dto.setRazorpayOrder(createOrder(
                dto.getPaymentPlanLocationDetails().getPayplanamount(), dto.getPaymentPlanLocationDetails().getGstamount()
        ));
    }

    private void createOrderLLP(LLPDTO dto) throws Exception {
        dto.setRazorpayOrder(createOrder(dto.getPaymentPlanLocationDetails().getPayplanamount(), dto.getPaymentPlanLocationDetails().getGstamount()));
    }

    private void createOrderPartnership(PartnershipDTO dto) throws Exception {
        dto.setRazorpayOrder(createOrder(dto.getPaymentPlanLocationDetails().getPayplanamount(), dto.getPaymentPlanLocationDetails().getGstamount()));
    }

    private void createOrderCompany(CompanyDetailsDTO dto) throws Exception {
        dto.setRazorpayOrder(createOrder(dto.getPaymentPlanLocationDetails().getPayplanamount(), dto.getPaymentPlanLocationDetails().getGstamount()));
    }

    private String createOrder(Double amount, Double gstAmount) throws Exception {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(
                    configService.getConfigByKey("payment.razorpay.key").getConfigvalue(),
                    configService.getConfigByKey("payment.razorpay.secret").getConfigvalue());
            JSONObject orderRequest = new JSONObject();

            Double feeAmountC = amount * 100;
            Double gstAmountC = gstAmount * 100;
            Double transactionFeesC = 2 * (feeAmountC + gstAmountC) / 100;
            orderRequest.put("amount", gstAmountC + feeAmountC + transactionFeesC); // amount in the smallest currency unit
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
