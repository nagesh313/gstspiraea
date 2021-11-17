package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.*;
import com.nextsaa.gstspiraea.repository.*;
import com.nextsaa.gstspiraea.service.ConfigService;
import com.nextsaa.gstspiraea.util.Utility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @Autowired
    private Utility utility;
    @Autowired
    private StateRepository stateRepository;
    @Autowired
    private PaymentPlanDetailsRepository paymentPlanDetailsRepository;

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
        if (!entity.getStatus().equals("PAID")) {
            entity.setStatus("CREATED");
            //Add logic to find the amount here
            Double amount = Double.valueOf(11000);
            Optional<PaymentPlanDetails> plan = paymentPlanDetailsRepository.findById(entity.getPaymentPlanDetailsId());
            if (plan.isPresent()) {
                Optional<PaymentPlanLocationDetails> selectedPlan = plan.get().getPayplanLocation().stream().filter(paymentPlanLocationDetails -> paymentPlanLocationDetails.getPayplanLocation().equals(entity.getLocation())).findAny();
                if (selectedPlan.isPresent()) {
                    amount = selectedPlan.get().getPayplanamount();
                }
            } else {
                Optional<State> state = stateRepository.findByName(entity.getLocation());
                if (state.isPresent()) {
                    amount = new Double(state.get().getAmount());
                }
            }
            entity.setRazorpayOrder(utility.createOrder(
                    amount
            ));
        }
    }

    private void createOrderLLP(LLP entity) throws Exception {
        if (!entity.getStatus().equals("PAID")) {
            entity.setStatus("CREATED");
            //Add logic to find the amount here
            Double amount = Double.valueOf(11000);
            Optional<PaymentPlanDetails> plan = paymentPlanDetailsRepository.findById(entity.getPaymentPlanDetailsId());
            if (plan.isPresent()) {
                Optional<PaymentPlanLocationDetails> selectedPlan = plan.get().getPayplanLocation().stream().filter(paymentPlanLocationDetails -> paymentPlanLocationDetails.getPayplanLocation().equals(entity.getLocation())).findAny();
                if (selectedPlan.isPresent()) {
                    amount = selectedPlan.get().getPayplanamount();
                }
            } else {
                Optional<State> state = stateRepository.findByName(entity.getLocation());
                if (state.isPresent()) {
                    amount = new Double(state.get().getAmount());
                }
            }
            entity.setRazorpayOrder(utility.createOrder(
                    amount
            ));
        }
    }

    private void createOrderPartnership(Partnership entity) throws Exception {
        if (!entity.getStatus().equals("PAID")) {
            entity.setStatus("CREATED");
            //Add logic to find the amount here
            Double amount = Double.valueOf(11000);
            Optional<PaymentPlanDetails> plan = paymentPlanDetailsRepository.findById(entity.getPaymentPlanDetailsId());
            if (plan.isPresent()) {
                Optional<PaymentPlanLocationDetails> selectedPlan = plan.get().getPayplanLocation().stream().filter(paymentPlanLocationDetails -> paymentPlanLocationDetails.getPayplanLocation().equals(entity.getLocation())).findAny();
                if (selectedPlan.isPresent()) {
                    amount = selectedPlan.get().getPayplanamount();
                }
            } else {
                Optional<State> state = stateRepository.findByName(entity.getLocation());
                if (state.isPresent()) {
                    amount = new Double(state.get().getAmount());
                }
            }
            entity.setRazorpayOrder(utility.createOrder(
                    amount
            ));
        }
    }

    private void createOrderCompany(CompanyDetails entity) throws Exception {
        if (!entity.getStatus().equals("PAID")) {
            entity.setStatus("CREATED");
            //Add logic to find the amount here
            Double amount = Double.valueOf(11000);
            Optional<PaymentPlanDetails> plan = paymentPlanDetailsRepository.findById(entity.getPaymentPlanDetailsId());
            if (plan.isPresent()) {
                Optional<PaymentPlanLocationDetails> selectedPlan = plan.get().getPayplanLocation().stream().filter(paymentPlanLocationDetails -> paymentPlanLocationDetails.getPayplanLocation().equals(entity.getLocation())).findAny();
                if (selectedPlan.isPresent()) {
                    amount = selectedPlan.get().getPayplanamount();
                }
            } else {
                Optional<State> state = stateRepository.findByName(entity.getLocation());
                if (state.isPresent()) {
                    amount = new Double(state.get().getAmount());
                }
            }
            entity.setRazorpayOrder(utility.createOrder(
                    amount
            ));
        }
    }

    @GetMapping(value = "/state-list")
    public List<State> getStateList() {
        return stateRepository.findAll();
    }

}
