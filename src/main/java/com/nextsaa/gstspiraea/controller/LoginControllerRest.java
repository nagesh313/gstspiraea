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
        UserDetails user = new UserDetails();
        user.setFirstName("admin");
        user.setLastName("admin");
        user.setUserEmail("nagesh3.13@gmail.com");
        user.setMobile(1234567489D);
        user.setGender("Male");
        user.setRole("Admin");
        user.setLoginUserName("admin");
        user.setLoginPassword("admin");
        user.setModifiedOn(LocalDateTime.now());
        user.setCreatedBy("admin");
        user.setCreatedOn(LocalDateTime.now());
        userDetailsRepository.save(user);
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
