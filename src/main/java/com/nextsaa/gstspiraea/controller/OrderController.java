package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import com.nextsaa.gstspiraea.repository.CompanyDetailsRepository;
import com.nextsaa.gstspiraea.repository.LLPRepostiory;
import com.nextsaa.gstspiraea.repository.PartnershipRepository;
import com.nextsaa.gstspiraea.repository.ProprietorshipRepostiory;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

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

    @GetMapping(value = "/All/{user}")
    public List<Object> getAll(@PathVariable String user) {
        List<Object> response = new ArrayList<>();
        response.addAll(proprietorshipRepostiory.findAllByCreatedBy(user));
        response.addAll(partnershipRepository.findAllByCreatedBy(user));
        response.addAll(llpRepostiory.findAllByCreatedBy(user));
        response.addAll(companyDetailsRepository.findAllByCreatedBy(user));
        return response;
    }

    @GetMapping(value = "/Proprietorship/{user}")
    public List<Proprietorship> getAllProprietorship(@PathVariable String user) {
        return proprietorshipRepostiory.findAllByCreatedBy(user);
    }

    @GetMapping(value = "/Partnership/{user}")
    public List<Partnership> getAllPartnership(@PathVariable String user) {
        return partnershipRepository.findAllByCreatedBy(user);
    }

    @GetMapping(value = "/LLP/{user}")
    public List<LLP> getAllLLP(@PathVariable String user) {
        return llpRepostiory.findAllByCreatedBy(user);

    }

    @GetMapping(value = "/Company/{user}")
    public List<CompanyDetails> getAllCompany(@PathVariable String user) {
        return companyDetailsRepository.findAllByCreatedBy(user);
    }

    @GetMapping(value = "/get/Proprietorship/{id}")
    public Proprietorship getProprietorshipById(@PathVariable String id) {
        Optional<Proprietorship> entity = proprietorshipRepostiory.findById(id);
        if (entity.isPresent()) {
            return entity.get();
        }
        return null;
    }

    @GetMapping(value = "/get/Partnership/{id}")
    public Partnership getPartnershipById(@PathVariable String id) {
        Optional<Partnership> entity = partnershipRepository.findById(id);
        if (entity.isPresent()) {
            return entity.get();
        }
        return null;
    }

    @GetMapping(value = "/get/LLP/{id}")
    public LLP getLLPById(@PathVariable String id) {
        Optional<LLP> entity = llpRepostiory.findById(id);
        if (entity.isPresent()) {
            return entity.get();
        }
        return null;
    }

    @GetMapping(value = "/get/Company/{id}")
    public CompanyDetails getCompanyById(@PathVariable String id) {
        Optional<CompanyDetails> entity = companyDetailsRepository.findById(id);
        if (entity.isPresent()) {
            return entity.get();
        }
        return null;
    }

    @GetMapping(value = "/{type}/{id}/{status}")
    public void approveOrder(@PathVariable String type, @PathVariable String id, @PathVariable String status) {
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
    public void updateGSTDocument(@PathVariable String type, @PathVariable String id, @PathVariable String documentURL) {
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

    @GetMapping(value = "/update-order-amount/{type}/{id}/{amount}")
    public void updateOrderAmount(@PathVariable String type, @PathVariable String id, @PathVariable Double amount) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(
                "rzp_test_4zyGtu09Yf3TwL",
                "km6IezoWKidIvUHBBsFR8LPs");
        switch (type) {
            case "Proprietorship":
                Optional<Proprietorship> entity1 = proprietorshipRepostiory.findById(id);
                if (entity1.isPresent()) {
                    Proprietorship object = entity1.get();
                    object.setRazorpayOrder(createOrder(amount));
                    proprietorshipRepostiory.save(object);
                }
                break;
            case "Partnership":
                Optional<Partnership> entity2 = partnershipRepository.findById(id);
                if (entity2.isPresent()) {
                    Partnership object = entity2.get();
                    object.setRazorpayOrder(createOrder(amount));
                    partnershipRepository.save(object);
                }
                break;
            case "LLP":
                Optional<LLP> entity3 = llpRepostiory.findById(id);
                if (entity3.isPresent()) {
                    LLP object = entity3.get();
                    object.setRazorpayOrder(createOrder(amount));
                    llpRepostiory.save(object);
                }
                break;
            case "Company":
                Optional<CompanyDetails> entity4 = companyDetailsRepository.findById(id);
                if (entity4.isPresent()) {
                    CompanyDetails object = entity4.get();
                    object.setRazorpayOrder(createOrder(amount));
                    companyDetailsRepository.save(object);
                }
                break;
        }
    }

    private String createOrder(Double amount) throws Exception {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(
                    "rzp_test_4zyGtu09Yf3TwL",
                    "km6IezoWKidIvUHBBsFR8LPs");
            JSONObject orderRequest = new JSONObject();
            Double feeAmountC = amount * 100;
            orderRequest.put("amount", feeAmountC); // amount in the smallest currency unit
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
