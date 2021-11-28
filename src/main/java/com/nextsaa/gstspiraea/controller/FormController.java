package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.*;
import com.nextsaa.gstspiraea.repository.*;
import com.nextsaa.gstspiraea.service.ConfigService;
import com.nextsaa.gstspiraea.service.UserService;
import com.nextsaa.gstspiraea.util.Utility;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.rmi.ServerException;
import java.time.LocalDateTime;
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
    @Autowired
    private UserService userService;

    @Autowired
    private EmailVerificationRepository emailVerificationRepository;

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

    @GetMapping(value = "/send-validation-mail/{type}/{subType}/{id}")
    public void getSendValidationMail(@PathVariable String type, @PathVariable String subType, @PathVariable String id,
                                      HttpServletRequest request) throws ServerException {
        switch (type) {
            case "Proprietorship":
                Optional<Proprietorship> entity1 = proprietorshipRepostiory.findById(id);
                if (entity1.isPresent()) {
                    if (subType.equals("Email")) {
                        userService.sendVerificationMail(request.getServerName() + ":" + request.getServerPort(), entity1.get().getEmailVerification(), entity1.get().getEmail());
                    } else if (subType.equals("Partner")) {
//                        userService.sendVerificationMail(entity1.get().getEmailVerification(), entity1.get().getEmail());
                    }
                } else {
                    throw new ServerException("Application not found");
                }

                break;
            case "Partnership":
                Optional<Partnership> entity2 = partnershipRepository.findById(id);
                if (entity2.isPresent()) {
                    Partnership object = entity2.get();
                    if (subType.equals("Email")) {
                        userService.sendVerificationMail(request.getServerName() + ":" + request.getServerPort(), entity2.get().getEmailVerification(), entity2.get().getEmail());
                    } else if (subType.equals("Partner")) {
                        Optional<Partner> email = object.getPartnerList().stream().filter(partner -> partner.getEmailVerification().getId().equals(id)).findFirst();
                        if (email.isPresent()) {
                            userService.sendVerificationMail(request.getServerName() + ":" + request.getServerPort(), email.get().getEmailVerification(), email.get().getPartnerEmail());
                        }
                    }
                }
                break;
            case "LLP":
                Optional<LLP> entity3 = llpRepostiory.findById(id);
                if (entity3.isPresent()) {
                    LLP object = entity3.get();
                    if (subType.equals("Email")) {
                        userService.sendVerificationMail(request.getServerName() + ":" + request.getServerPort(), entity3.get().getEmailVerification(), entity3.get().getEmail());
                    } else if (subType.equals("Partner")) {
                        Optional<Partner> email = object.getPartnerList().stream().filter(partner -> partner.getEmailVerification().getId().equals(id)).findFirst();
                        if (email.isPresent()) {
                            userService.sendVerificationMail(request.getServerName() + ":" + request.getServerPort(), email.get().getEmailVerification(), email.get().getPartnerEmail());
                        }
                    }
                }
                break;
            case "Company":
                Optional<CompanyDetails> entity4 = companyDetailsRepository.findById(id);
                if (entity4.isPresent()) {
                    CompanyDetails object = entity4.get();
                    if (subType.equals("Email")) {
                        userService.sendVerificationMail(request.getServerName() + ":" + request.getServerPort(), entity4.get().getEmailVerification(), entity4.get().getEmail());
                    } else if (subType.equals("Director")) {
//                        Optional<Partner> email = object.getDirectorList().stream().filter(director -> director.get().getId().equals(id)).findFirst();
//                        if (email.isPresent()) {
//                            userService.sendVerificationMail(request.getServerName() + ":" + request.getServerPort(), email.get().getEmailVerification(), email.get().getPartnerEmail());
//                        }
                    }
                }
                break;
        }

    }

    @GetMapping(value = "/verify-email//{id}")
    public void verifyEmail(@PathVariable String id,
                            HttpServletRequest request) throws ServerException {

        Optional<EmailVerification> emailVerification = emailVerificationRepository.findById(id);
        if (emailVerification.isPresent()) {
            EmailVerification email = emailVerification.get();
            email.setVerified(true);
            email.setVerifiedOn(LocalDateTime.now());
            emailVerificationRepository.save(email);
        }
    }
}
