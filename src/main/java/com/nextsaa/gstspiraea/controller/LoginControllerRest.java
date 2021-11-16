package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.dto.GSTApplicationType;
import com.nextsaa.gstspiraea.dto.LoginForm;
import com.nextsaa.gstspiraea.entity.*;
import com.nextsaa.gstspiraea.repository.*;
import com.nextsaa.gstspiraea.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.naming.AuthenticationException;
import java.rmi.ServerException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginControllerRest {


    @Autowired
    UserService userService;
    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    private ProprietorshipRepostiory proprietorshipRepostiory;
    @Autowired
    private PartnershipRepository partnershipRepository;
    @Autowired
    private LLPRepostiory llpRepostiory;
    @Autowired
    private CompanyDetailsRepository companyDetailsRepository;

    @PostMapping("/login")
    public UserDetails login(@RequestBody LoginForm user) throws AuthenticationException {
        Boolean result = userService.checkLoginDetails(user.getLoginUserName(), user.getLoginPassword(), user.getRole());
        if (!result) {
            throw new AuthenticationException("User Credentials not matching");
        }
        return userService.getUserDetails(user.getLoginUserName(), user.getLoginPassword(), user.getRole());
    }

    @PostMapping(value = "/createRegistration")
    public void createRegistration(@RequestBody UserDetails user) throws ServerException {
        //Set default fields for customer registration
        user.setCreatedBy("REGISTRATION");
        if (user.getRole() == null) {
            user.setRole("Customer");
        }
        user.setIsActive(1);
        user.setIsEmailVerified(0);
        user.setIsMobileVerified(0);
        userService.createUser(user);
    }

    @GetMapping(value = "/getAllUsers")
    public List<UserDetails> getAllUsers() {
        //Set default fields for customer registrationCUSTOMER
        return userService.getAllUsers();
    }

    @GetMapping(value = "/updateUserAgentMapping/{userId}/{agentName}")
    public void updateUserAgentMapping(@PathVariable String userId, @PathVariable String agentName) {
        //Set default fields for customer registration
        Optional<UserDetails> user = userDetailsRepository.findById(userId);
        if (user.isPresent()) {
            UserDetails userDetails = user.get();
            userDetails.setAssignedToAgent(agentName);
            userDetailsRepository.save(userDetails);
        }
    }

    @PostMapping("/generateLoginDetails")
    public void generateLoginDetails(@RequestBody UserDetails user) {
        userService.updateLoginDetails(user);
    }

    @GetMapping("/get-admin-dashboard")
    public Map<String, Object> getAdminDashboard() {
        LocalDateTime ld = LocalDate.now().atStartOfDay(); // Friday as original date
        ld = ld.with(DayOfWeek.SUNDAY);
        ld = ld.minusDays(7);
        Long total = proprietorshipRepostiory.countByCreatedOnGreaterThan(ld) + partnershipRepository.countByCreatedOnGreaterThan(ld) + llpRepostiory.countByCreatedOnGreaterThan(ld) + companyDetailsRepository.countByCreatedOnGreaterThan(ld);

        Long approved = proprietorshipRepostiory.countByStatusAndCreatedOnGreaterThan("APPROVED", ld) + partnershipRepository.countByStatusAndCreatedOnGreaterThan("APPROVED", ld) + llpRepostiory.countByStatusAndCreatedOnGreaterThan("APPROVED", ld) + companyDetailsRepository.countByStatusAndCreatedOnGreaterThan("APPROVED", ld);
        Long pending = proprietorshipRepostiory.countByStatusAndCreatedOnGreaterThan("CREATED", ld) + partnershipRepository.countByStatusAndCreatedOnGreaterThan("CREATED", ld) + llpRepostiory.countByStatusAndCreatedOnGreaterThan("CREATED", ld) + companyDetailsRepository.countByStatusAndCreatedOnGreaterThan("CREATED", ld);
        Long rejected = proprietorshipRepostiory.countByStatusAndCreatedOnGreaterThan("REJECTED", ld) + partnershipRepository.countByStatusAndCreatedOnGreaterThan("REJECTED", ld) + llpRepostiory.countByStatusAndCreatedOnGreaterThan("REJECTED", ld) + companyDetailsRepository.countByStatusAndCreatedOnGreaterThan("REJECTED", ld);
        System.out.println(ld); // 2017-08-20 (2 days later according to ISO)
        Long approvedPercentage;
        Long pendingPercentage;
        Long rejectedPercentage;
        if (total == 0) {
            approvedPercentage = 0L;
            pendingPercentage = 0L;
            rejectedPercentage = 0L;
        } else {
            approvedPercentage = approved * 100 / total;
            pendingPercentage = pending * 100 / total;
            rejectedPercentage = rejected * 100 / total;
        }

        List<Proprietorship> list1 = proprietorshipRepostiory.findAllByStatusAndCreatedOnGreaterThan("PAID", LocalDate.now().atStartOfDay());
        List<Partnership> list2 = partnershipRepository.findAllByStatusAndCreatedOnGreaterThan("PAID", LocalDate.now().atStartOfDay());
        List<LLP> list3 = llpRepostiory.findAllByStatusAndCreatedOnGreaterThan("PAID", LocalDate.now().atStartOfDay());
        List<CompanyDetails> list4 = companyDetailsRepository.findAllByStatusAndCreatedOnGreaterThan("PAID", LocalDate.now().atStartOfDay());
        Double sum1 = list1.stream()
                .mapToDouble(o -> o.getPaymentPlanLocationDetails().getPayplanamount())
                .sum();
        Double sum2 = list2.stream()
                .mapToDouble(o -> o.getPaymentPlanLocationDetails().getPayplanamount())
                .sum();
        Double sum3 = list3.stream()
                .mapToDouble(o -> o.getPaymentPlanLocationDetails().getPayplanamount())
                .sum();
        Double sum4 = list4.stream()
                .mapToDouble(o -> o.getPaymentPlanLocationDetails().getPayplanamount())
                .sum();
        Double todaysBusiness = sum1 + sum2 + sum3 + sum4;
        todaysBusiness = todaysBusiness + todaysBusiness * 2 / 100;
        todaysBusiness.longValue();
        Long todaysApplication = proprietorshipRepostiory.countByCreatedOnGreaterThan(LocalDate.now().atStartOfDay()) + partnershipRepository.countByCreatedOnGreaterThan(LocalDate.now().atStartOfDay()) + llpRepostiory.countByCreatedOnGreaterThan(LocalDate.now().atStartOfDay()) + companyDetailsRepository.countByCreatedOnGreaterThan(LocalDate.now().atStartOfDay());
        Long totalCustomers = userDetailsRepository.count();
        Long applicationsManagement = proprietorshipRepostiory.count() + partnershipRepository.count() + llpRepostiory.count() + companyDetailsRepository.count();
        Long customerManagement = userDetailsRepository.countByLoginUserName(null);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("approved", approved);
        jsonObject.put("pending", pending);
        jsonObject.put("rejected", rejected);
        jsonObject.put("approvedPercentage", approvedPercentage);
        jsonObject.put("pendingPercentage", pendingPercentage);
        jsonObject.put("rejectedPercentage", rejectedPercentage);
        jsonObject.put("todaysBusiness", todaysBusiness);
        jsonObject.put("todaysApplication", todaysApplication);
        jsonObject.put("totalCustomers", totalCustomers);
        jsonObject.put("applicationsManagement", applicationsManagement);
        jsonObject.put("customerManagement", customerManagement);
        return jsonObject.toMap();
    }

    @PostMapping("/applyGST")
    public String getGSTForm(@RequestBody GSTApplicationType gstapplicationType) {
        if (gstapplicationType.getBusinessType().equalsIgnoreCase("Proprietorship")) {
            return "Proprietorship";
        } else if (gstapplicationType.getBusinessType().equalsIgnoreCase("Partnership")) {
            return "Partnership";
        } else if (gstapplicationType.getBusinessType().equalsIgnoreCase("LLP")) {
            return "LLP";
        } else if (gstapplicationType.getBusinessType().equalsIgnoreCase("Company")) {
            return "Company";
        }
        return "GSTApplication";
    }

    @DeleteMapping("/delete-user/{userid}")
    public void deleteUser(@PathVariable String userid) {
        userDetailsRepository.deleteById(userid);
    }
}
