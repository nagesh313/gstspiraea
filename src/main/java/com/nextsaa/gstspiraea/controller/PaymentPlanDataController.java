package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.PaymentPlanDetails;
import com.nextsaa.gstspiraea.entity.PaymentPlanLocationDetails;
import com.nextsaa.gstspiraea.repository.PaymentPlanDetailsRepository;
import com.nextsaa.gstspiraea.repository.PaymentPlanLocationDetailsRepository;
import com.nextsaa.gstspiraea.repository.UserDetailsRepository;
import com.nextsaa.gstspiraea.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class PaymentPlanDataController {

    @Autowired
    UserService userService;
    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    PaymentPlanDetailsRepository paymentPlanDetailsRepository;
    @Autowired
    PaymentPlanLocationDetailsRepository paymentPlanLocationDetailsRepository;

    @PostConstruct
    public void createPlan1() {
        PaymentPlanDetails plan1 = new PaymentPlanDetails();
        plan1.setPayplanname("Place of Business (Rent Agreement) + GST registration");
        plan1.setRemarks("11 months rent agreement.");
        PaymentPlanLocationDetails p1 = new PaymentPlanLocationDetails();
        p1.setPayplanLocation("Mumbai / Bangalore / Delhi NCR/ Hyderabad");
        p1.setPayplanamount(11000D);
        PaymentPlanLocationDetails p2 = new PaymentPlanLocationDetails();
        p2.setPayplanLocation("Kolkata");
        p2.setPayplanamount(18000D);
        paymentPlanLocationDetailsRepository.saveAll(Arrays.asList(p1, p2));
        plan1.setPayplanLocation(Arrays.asList(p1, p2));
        paymentPlanDetailsRepository.save(plan1);
    }

    @PostConstruct
    public void createPlan2() {
        PaymentPlanDetails plan1 = new PaymentPlanDetails();
        plan1.setPayplanname("Place of Business (Rent Agreement) Only");
        plan1.setRemarks("11 months rent agreement.");
        PaymentPlanLocationDetails p1 = new PaymentPlanLocationDetails();
        p1.setPayplanLocation("Mumbai / Bangalore / Delhi NCR/ Hyderabad");
        p1.setPayplanamount(10000D);
        PaymentPlanLocationDetails p2 = new PaymentPlanLocationDetails();
        p2.setPayplanLocation("Kolkata");
        p2.setPayplanamount(12000D);
        paymentPlanLocationDetailsRepository.saveAll(Arrays.asList(p1, p2));
        plan1.setPayplanLocation(Arrays.asList(p1, p2));
        paymentPlanDetailsRepository.save(plan1);
    }

    @PostConstruct
    public void createPlan3() {
        PaymentPlanDetails plan1 = new PaymentPlanDetails();
        plan1.setPayplanname("GST Registration Only");
        plan1.setRemarks("Gumasta / Shop establishment license is not included in this");
        PaymentPlanLocationDetails p1 = new PaymentPlanLocationDetails();
        p1.setPayplanLocation("Mumbai / Bangalore / Delhi NCR/ Hyderabad");
        p1.setPayplanamount(2500D);
        PaymentPlanLocationDetails p2 = new PaymentPlanLocationDetails();
        p2.setPayplanLocation("Kolkata");
        p2.setPayplanamount(5000D);
        paymentPlanLocationDetailsRepository.saveAll(Arrays.asList(p1, p2));
        plan1.setPayplanLocation(Arrays.asList(p1, p2));
        paymentPlanDetailsRepository.save(plan1);
    }

    @PostConstruct
    public void createPlan4() {
        PaymentPlanDetails plan4 = new PaymentPlanDetails();
        plan4.setPayplanname("Gumasta / Shop establishment license");
        plan4.setRemarks("Applicable only Kolkata");
        PaymentPlanLocationDetails p1 = new PaymentPlanLocationDetails();
        p1.setPayplanLocation("Kolkata");
        p1.setPayplanamount(3000D);
        paymentPlanLocationDetailsRepository.saveAll(Arrays.asList(p1));
        plan4.setPayplanLocation(Arrays.asList(p1));
        paymentPlanDetailsRepository.save(plan4);
    }

    @GetMapping("/plan-list")
    private List<PaymentPlanDetails> getAllPaymentPlanDetails() {
        return paymentPlanDetailsRepository.findAll();
    }

    @PostMapping("/plan")
    private void savePlan(@RequestBody PaymentPlanDetails paymentPlanDetails) {
        paymentPlanDetailsRepository.save(paymentPlanDetails);
    }

    @PostMapping("/plan-location/{id}")
    private void savePlanLocation(@RequestBody PaymentPlanLocationDetails paymentPlanLocationDetails,
                                  @PathVariable("id") String id) {
        Optional<PaymentPlanDetails> paymentPlanDetails = paymentPlanDetailsRepository.findById(id);
        if (paymentPlanDetails.isPresent()) {
            PaymentPlanDetails paymentPlan = paymentPlanDetails.get();
            paymentPlanLocationDetailsRepository.save(paymentPlanLocationDetails);
            paymentPlan.getPayplanLocation().add(paymentPlanLocationDetails);
            paymentPlanDetailsRepository.save(paymentPlan);
        }

///        paymentPlanLocationDetailsRepository.save(paymentPlanLocationDetails);
    }


    @DeleteMapping("/plan/{id}")
    private void deleteBook(@PathVariable("id") String id) {
        paymentPlanDetailsRepository.deleteById(id);
    }

    @DeleteMapping("/plan-location/{planId}/{id}")
    private void deletePlanLocation(@PathVariable("planId") String planId, @PathVariable("id") String id) {
        Optional<PaymentPlanDetails> plan = paymentPlanDetailsRepository.findById(planId);
        if (plan.isPresent()) {
            PaymentPlanDetails planDetails = plan.get();
            List<PaymentPlanLocationDetails> updatedList = planDetails.getPayplanLocation().stream().filter(planLocationDetails -> id.equals(planLocationDetails.getId())).collect(Collectors.toList());
            planDetails.setPayplanLocation(updatedList);
            paymentPlanDetailsRepository.save(planDetails);
        }
    }

    @PostMapping("/books")
    private void saveBook(@RequestBody PaymentPlanDetails books) {
        paymentPlanDetailsRepository.save(books);
    }

    @PutMapping("/books")
    private PaymentPlanDetails update(@RequestBody PaymentPlanDetails books) {
        paymentPlanDetailsRepository.save(books);
        return books;
    }


}
