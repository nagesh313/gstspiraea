package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.dto.GSTApplicationType;
import com.nextsaa.gstspiraea.dto.LoginForm;
import com.nextsaa.gstspiraea.dto.UserDetailsDTO;
import com.nextsaa.gstspiraea.entity.UserDetails;
import com.nextsaa.gstspiraea.repository.*;
import com.nextsaa.gstspiraea.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.naming.AuthenticationException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginControllerRest {


    @Autowired
    UserService userService;
    @Autowired
    UserDetailsRepository userDetailsRepository;

    @PostConstruct
    public void createAdminUser() {
        UserDetails admin = new UserDetails();
        admin.setFirstName("admin");
        admin.setLastName("admin");
        admin.setUserEmail("nagesh3.13@gmail.com");
        admin.setMobile(1234567489D);
        admin.setGender("Male");
        admin.setRole("Admin");
        admin.setLoginUserName("admin");
        admin.setLoginPassword("admin");
        admin.setModifiedOn(LocalDateTime.now());
        admin.setCreatedBy("admin");
        admin.setCreatedOn(LocalDateTime.now());
        userDetailsRepository.save(admin);

        UserDetails user = new UserDetails();
        user.setFirstName("user");
        user.setLastName("user");
        user.setUserEmail("nagesh3.13@gmail.com");
        user.setMobile(1234567489D);
        user.setGender("Male");
        user.setRole("Customer");
        user.setLoginUserName("user");
        user.setLoginPassword("user");
        user.setModifiedOn(LocalDateTime.now());
        user.setCreatedBy("admin");
        user.setCreatedOn(LocalDateTime.now());
        userDetailsRepository.save(user);

        UserDetails agent = new UserDetails();
        agent.setFirstName("agent");
        agent.setLastName("agent");
        agent.setUserEmail("nagesh3.13@gmail.com");
        agent.setMobile(1234567489D);
        agent.setGender("Male");
        agent.setRole("Agent");
        agent.setLoginUserName("agent");
        agent.setLoginPassword("agent");
        agent.setModifiedOn(LocalDateTime.now());
        agent.setCreatedBy("admin");
        agent.setCreatedOn(LocalDateTime.now());
        userDetailsRepository.save(agent);
    }

    @Autowired
    private ProprietorshipRepostiory proprietorshipRepostiory;
    @Autowired
    private PartnershipRepository partnershipRepository;
    @Autowired
    private LLPRepostiory llpRepostiory;
    @Autowired
    private CompanyDetailsRepository companyDetailsRepository;

    @PostMapping("/login")
    public void login(@RequestBody LoginForm user) throws AuthenticationException {
        Boolean result = userService.checkLoginDetails(user.getLoginUserName(), user.getLoginPassword(), user.getRole());
        if (!result) {
            throw new AuthenticationException("User Credentials not matching");
        }
    }

    @PostMapping(value = "/createRegistration")
    public void createRegistration(@RequestBody UserDetailsDTO user) {
        //Set default fields for customer registration
        user.setCreatedBy("REGISTRATION");
        user.setRole("CUSTOMER");
        user.setIsActive(1);
        user.setIsEmailVerified(0);
        user.setIsMobileVerified(0);
        userService.createUser(user);
        System.out.print("Here");
    }

    @GetMapping(value = "/getAllUsers")
    public List<UserDetailsDTO> getAllUsers() {
        //Set default fields for customer registration
        return userService.getAllUsers();
    }

    @PostMapping("/generateLoginDetails")
    public void generateLoginDetails(@RequestBody UserDetailsDTO user) {
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

        Long todaysBusiness = 0L;
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
}
