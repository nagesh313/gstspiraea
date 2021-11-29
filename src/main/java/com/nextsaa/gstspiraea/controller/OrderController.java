package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import com.nextsaa.gstspiraea.repository.CompanyDetailsRepository;
import com.nextsaa.gstspiraea.repository.LLPRepostiory;
import com.nextsaa.gstspiraea.repository.PartnershipRepository;
import com.nextsaa.gstspiraea.repository.ProprietorshipRepostiory;
import com.nextsaa.gstspiraea.util.Utility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    Utility utility;

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
    public List<Proprietorship> getAllProprietorship(@PathVariable String user, @RequestParam Map<String, String> params) {
        System.out.println(params);
        if (params != null && params.size() > 0) {
            return proprietorshipRepostiory.findAllByCreatedByInAndProprietorshipidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                    Arrays.asList(user),
                    params.get("searchText"),
                    params.get("searchText"),
                    params.get("searchText"));
        } else {
            return proprietorshipRepostiory.findAllByCreatedBy(user);
        }
    }

    @GetMapping(value = "/Partnership/{user}")
    public List<Partnership> getAllPartnership(@PathVariable String user, @RequestParam Map<String, String> params) {
        if (params != null && params.size() > 0) {
            return partnershipRepository.findAllByCreatedByInAndPartnershipidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                    Arrays.asList(user),
                    params.get("searchText"),
                    params.get("searchText"),
                    params.get("searchText"));
        } else {
            return partnershipRepository.findAllByCreatedBy(user);
        }
    }

    @GetMapping(value = "/LLP/{user}")
    public List<LLP> getAllLLP(@PathVariable String user, @RequestParam Map<String, String> params) {
        if (params != null && params.size() > 0) {
            return llpRepostiory.findAllByCreatedByInAndLlpidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                    Arrays.asList(user),
                    params.get("searchText"),
                    params.get("searchText"),
                    params.get("searchText"));
        } else {
            return llpRepostiory.findAllByCreatedBy(user);
        }

    }

    @GetMapping(value = "/Company/{user}")
    public List<CompanyDetails> getAllCompany(@PathVariable String user, @RequestParam Map<String, String> params) {
        if (params != null && params.size() > 0) {
            return companyDetailsRepository.findAllByCreatedByInAndCompanydetailsidLikeOrTradeNameLikeOrLegalbusinessNameLike(
                    Arrays.asList(user),
                    params.get("searchText"),
                    params.get("searchText"),
                    params.get("searchText"));
        } else {
            return companyDetailsRepository.findAllByCreatedBy(user);
        }
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

//    @GetMapping(value = "/update-order-amount/{type}/{id}/{amount}")
//    public void updateOrderAmount(@PathVariable String type, @PathVariable String id, @PathVariable Double amount) throws Exception {
//        RazorpayClient razorpayClient = new RazorpayClient(
//                "rzp_test_4zyGtu09Yf3TwL",
//                "km6IezoWKidIvUHBBsFR8LPs");
//        switch (type) {
//            case "Proprietorship":
//                Optional<Proprietorship> entity1 = proprietorshipRepostiory.findById(id);
//                if (entity1.isPresent()) {
//                    Proprietorship object = entity1.get();
//                    object.setRazorpayOrder(utility.createOrder(amount));
//                    proprietorshipRepostiory.save(object);
//                }
//                break;
//            case "Partnership":
//                Optional<Partnership> entity2 = partnershipRepository.findById(id);
//                if (entity2.isPresent()) {
//                    Partnership object = entity2.get();
//                    object.setRazorpayOrder(utility.createOrder(amount));
//                    partnershipRepository.save(object);
//                }
//                break;
//            case "LLP":
//                Optional<LLP> entity3 = llpRepostiory.findById(id);
//                if (entity3.isPresent()) {
//                    LLP object = entity3.get();
//                    object.setRazorpayOrder(utility.createOrder(amount));
//                    llpRepostiory.save(object);
//                }
//                break;
//            case "Company":
//                Optional<CompanyDetails> entity4 = companyDetailsRepository.findById(id);
//                if (entity4.isPresent()) {
//                    CompanyDetails object = entity4.get();
//                    object.setRazorpayOrder(utility.createOrder(amount));
//                    companyDetailsRepository.save(object);
//                }
//                break;
//        }
//    }


}
