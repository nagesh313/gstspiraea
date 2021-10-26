package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.dto.GSTApplicationType;
import com.nextsaa.gstspiraea.dto.LoginForm;
import com.nextsaa.gstspiraea.dto.UserDetailsDTO;
import com.nextsaa.gstspiraea.entity.UserDetails;
import com.nextsaa.gstspiraea.repository.UserDetailsRepository;
import com.nextsaa.gstspiraea.service.UserService;
import com.sun.org.apache.xpath.internal.operations.Bool;
import jdk.nashorn.internal.objects.annotations.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.naming.AuthenticationException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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
