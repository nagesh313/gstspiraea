package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.*;
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
    @Autowired
    private GSTCertificatesInOtherStatesRepository gstCertificatesInOtherStatesRepository;

    @PostMapping(value = "/save-submit-proprietorship")
    public void saveSubmitProprietorship(@RequestBody Proprietorship entity) throws Exception {
        entity.setStatus("DRAFT");
        proprietorshipRepostiory.save(entity);
    }

    @PostMapping(value = "/save-submit-partnership")
    public void saveSubmitPartnership(@RequestBody Partnership entity) throws Exception {
        entity.setStatus("DRAFT");
        partnershipRepository.save(entity);
    }

    @PostMapping(value = "/save-submit-llp")
    public void saveSubmitLLP(@RequestBody LLP entity) throws Exception {
        entity.setStatus("DRAFT");
        llpRepostiory.save(entity);
    }

    @PostMapping(value = "/save-submit-company-details")
    public void saveSubmitCompanyDetails(@RequestBody CompanyDetails entity) throws Exception {
        entity.setStatus("DRAFT");
        companyDetailsRepository.save(entity);
    }


    @PostMapping(value = "/submit-proprietorship")
    public void submitProprietorship(@RequestBody Proprietorship entity) throws Exception {
        createOrderProprietorship(entity);
        proprietorshipRepostiory.save(entity);
    }

    @PostMapping(value = "/submit-partnership")
    public void submitPartnership(@RequestBody Partnership entity) throws Exception {
        createOrderPartnership(entity);
        partnershipRepository.save(entity);
    }

    @PostMapping(value = "/submit-llp")
    public void submitLLP(@RequestBody LLP entity) throws Exception {
        createOrderLLP(entity);
        llpRepostiory.save(entity);
    }

    @PostMapping(value = "/submit-company-details")
    public void submitCompanyDetails(@RequestBody CompanyDetails entity) throws Exception {
        createOrderCompany(entity);
        companyDetailsRepository.save(entity);
    }

    private void createOrderProprietorship(Proprietorship entity) throws Exception {
        entity.setStatus("CREATED");
        entity.setRazorpayOrder(createOrder(
                entity.getPaymentPlanLocationDetails().getPayplanamount()
        ));
    }

    private void createOrderLLP(LLP entity) throws Exception {
        entity.setStatus("CREATED");
        entity.setRazorpayOrder(createOrder(entity.getPaymentPlanLocationDetails().getPayplanamount()));
    }

    private void createOrderPartnership(Partnership entity) throws Exception {
        entity.setStatus("CREATED");
        entity.setRazorpayOrder(createOrder(entity.getPaymentPlanLocationDetails().getPayplanamount()));
    }

    private void createOrderCompany(CompanyDetails entity) throws Exception {
        entity.setStatus("CREATED");
        entity.setRazorpayOrder(createOrder(entity.getPaymentPlanLocationDetails().getPayplanamount()));
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
