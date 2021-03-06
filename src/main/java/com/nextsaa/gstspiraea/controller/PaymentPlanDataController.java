package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.PaymentPlanDetails;
import com.nextsaa.gstspiraea.entity.PaymentPlanLocationDetails;
import com.nextsaa.gstspiraea.repository.PaymentPlanDetailsRepository;
import com.nextsaa.gstspiraea.repository.PaymentPlanLocationDetailsRepository;
import com.nextsaa.gstspiraea.repository.UserDetailsRepository;
import com.nextsaa.gstspiraea.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.rmi.ServerException;
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
    private void deletePlanLocation(@PathVariable("planId") String planId, @PathVariable("id") String id) throws ServerException {
        Optional<PaymentPlanDetails> plan = paymentPlanDetailsRepository.findById(planId);
        if (plan.isPresent()) {
            PaymentPlanDetails planDetails = plan.get();
            PaymentPlanLocationDetails toBeDeletedPlan = planDetails.getPayplanLocation().stream().filter(planLocationDetails -> id.equals(planLocationDetails.getId())).collect(Collectors.toList()).get(0);
            if (toBeDeletedPlan.isCanDelete()) {
                List<PaymentPlanLocationDetails> updatedList = planDetails.getPayplanLocation().stream().filter(planLocationDetails -> !id.equals(planLocationDetails.getId())).collect(Collectors.toList());
                planDetails.setPayplanLocation(updatedList);
                paymentPlanDetailsRepository.save(planDetails);
            } else {
                throw new ServerException("Plan location cannot be deleted");
            }

        }
    }

    @GetMapping("/update-plan-location-amount/{id}/{amount}")
    private void updatePlanLocationAmount(@PathVariable("id") String id, @PathVariable("amount") Double amount) throws ServerException {
        Optional<PaymentPlanLocationDetails> location = paymentPlanLocationDetailsRepository.findById(id);
        if (location.isPresent()) {
            PaymentPlanLocationDetails locationObject = location.get();
            locationObject.setPayplanamount(amount);
            paymentPlanLocationDetailsRepository.save(locationObject);
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
