package com.nextsaa.gstspiraea.service;

import com.nextsaa.gstspiraea.entity.EmailVerification;
import com.nextsaa.gstspiraea.entity.UserDetails;
import com.nextsaa.gstspiraea.exceptions.DataNotFoundException;
import com.nextsaa.gstspiraea.repository.EmailVerificationRepository;
import com.nextsaa.gstspiraea.repository.UserDetailsRepository;
import com.nextsaa.gstspiraea.util.ExceptionConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.rmi.ServerException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private final UserDetailsRepository userDetailsRepository;

    @Autowired
    private final ConfigService configService;

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private EmailVerificationRepository emailVerificationRepository;

	/*@Autowired ,PasswordEncoder passwordEncoder
    private final PasswordEncoder passwordEncoder;*/

    public UserService(final UserDetailsRepository userDetailsRepository, ConfigService configService) {
        this.userDetailsRepository = userDetailsRepository;
        //this.passwordEncoder = passwordEncoder;
        this.configService = configService;
    }

    public UserDetails getUserById(String id) {
        UserDetails user = userDetailsRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException(ExceptionConstants.USER_RECORD_NOT_FOUND));
        return user;
    }


    public UserDetails createUser(UserDetails userDetails) throws ServerException {
        boolean user = userDetailsRepository.existsByUserEmail(userDetails.getUserEmail());
        if (user) {
            throw new ServerException("Email Id Already Exist");
        } else {
            UserDetails newUser = userDetailsRepository.save(userDetails);
            return newUser;
        }
    }

    public UserDetails getUserDetails(String username, String password, String role) throws AuthenticationException {
        UserDetails user = userDetailsRepository.findByLoginUserName(username);
        //passwordEncoder.encode
        return user;
    }

    public Boolean checkLoginDetails(String username, String password, String role) throws AuthenticationException {
        UserDetails user = userDetailsRepository.findByLoginUserName(username);
        //passwordEncoder.encode
        if (user.getLoginPassword().equals(password) && user.getRole().equalsIgnoreCase(role)) {
            return true;
        } else {
            throw new AuthenticationException("Invalid Credentials");
        }
    }


    public List<UserDetails> getAllUsers() {
        return userDetailsRepository.findAll();
    }


    public UserDetails updateLoginDetails(UserDetails userDetailsDTO) {
//        String loginUserName = "";
//        String password = Utility.generateCommonLangPassword();
//        if (userDetailsDTO.getFirstName().length() > 4) {
//            loginUserName = userDetailsDTO.getFirstName().substring(0, 4);
//        }
//        if (userDetailsDTO.getUserEmail().length() > 4) {
//            loginUserName = loginUserName.concat("1" + userDetailsDTO.getUserEmail().substring(0, 4));
//        }

        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(userDetailsDTO.getUserEmail());
            msg.setFrom(configService.getConfigByKey("originatorEmail").getConfigvalue());
            msg.setSubject(configService.getConfigByKey("loginMailSubject").getConfigvalue());
            msg.setText(
                    "Dear " + userDetailsDTO.getBusinessName() + " ,\n\n"
                            + "Welcome to Spiraea Services !!\n"
                            + "We’re pleased to onboard " + userDetailsDTO.getBusinessName() + " on our portal. SPIRAEA has partnered with "
                            + "Flipkart to assist its vendors for GST Registrations PAN INDIA.\n\n"
                            + "You have successfully been registered on our platform to upload documents for GST" +
                            "Registrations. Please find below your user id & password for login.\n\n"
                            + "\n Role: " + userDetailsDTO.getRole()
                            + "\n UserName: " + userDetailsDTO.getLoginUserName()
                            + "\n Password: " + userDetailsDTO.getLoginPassword()
                            + "\nLink for Login : https://app-gstspiraea.herokuapp.com\n"
                            + "We want to take this opportunity to thank you for selecting Spiraea as your preferred " +
                            "partner. In case of any concerns, you can reach out to SPIRAEA HELPDESK at +91 7829930300.\n\n" +
                            "You can also reach out to SPIRAEA for our other service offerings (PAN INDIA) : \n" +
                            "1) Book Keeping & Accounting\n" +
                            "2) GST Compliance & Advisory \n" +
                            "3) Income Tax Return Filing & Advisory \n" +
                            "4) Department hearing & related matters.\n\n\n"
                            + "Regards,\n"
                            + "Spiraea Team\n"
                            + "http://www.spiraea.in/"
            );
            javaMailSender.send(msg);
        } catch (Exception e) {
            System.out.println("Unable to send mail");
        }
        UserDetails user = userDetailsRepository.findById(userDetailsDTO.getUserId()).orElseThrow(() -> new DataNotFoundException(ExceptionConstants.USER_RECORD_NOT_FOUND));
        user.setLoginUserName(userDetailsDTO.getLoginUserName());
        user.setLoginPassword(userDetailsDTO.getLoginPassword());
        user.setModifiedOn(LocalDateTime.now());
        user.setModifiedBy("ADMIN");
        return userDetailsRepository.save(user);
    }

    public void resendCredentials(String email) {
        Optional<UserDetails> userDetails = userDetailsRepository.findByUserEmail(email);
        if (userDetails.isPresent()) {
            UserDetails userDetailsDTO = userDetails.get();
            try {
                SimpleMailMessage msg = new SimpleMailMessage();
                msg.setTo(userDetailsDTO.getUserEmail());
                msg.setFrom(configService.getConfigByKey("originatorEmail").getConfigvalue());
                msg.setSubject(configService.getConfigByKey("loginMailSubject").getConfigvalue());
                msg.setText(
                        "Dear " + userDetailsDTO.getBusinessName() + " ,\n\n"
                                + "Welcome to Spiraea Services !!\n"
                                + "We’re pleased to onboard " + userDetailsDTO.getBusinessName() + " on our portal. SPIRAEA has partnered with "
                                + "Flipkart to assist its vendors for GST Registrations PAN INDIA.\n\n"
                                + "You have successfully been registered on our platform to upload documents for GST" +
                                "Registrations. Please find below your user id & password for login.\n\n"
                                + "\n Role: " + userDetailsDTO.getRole()
                                + "\n UserName: " + userDetailsDTO.getLoginUserName()
                                + "\n Password: " + userDetailsDTO.getLoginPassword()
                                + "\nLink for Login : https://app-gstspiraea.herokuapp.com\n"
                                + "We want to take this opportunity to thank you for selecting Spiraea as your preferred " +
                                "partner. In case of any concerns, you can reach out to SPIRAEA HELPDESK at +91 7829930300.\n\n" +
                                "You can also reach out to SPIRAEA for our other service offerings (PAN INDIA) : \n" +
                                "1) Book Keeping & Accounting\n" +
                                "2) GST Compliance & Advisory \n" +
                                "3) Income Tax Return Filing & Advisory \n" +
                                "4) Department hearing & related matters.\n\n\n"
                                + "Regards,\n"
                                + "Spiraea Team\n"
                                + "http://www.spiraea.in/"
                );
                javaMailSender.send(msg);
            } catch (Exception e) {
                System.out.println("Unable to send mail");
            }
        }
    }

    public void sendVerificationMail(String url, EmailVerification emailVerification, String email) {
        emailVerification.setVerified(false);
        emailVerification.setVerifiedOn(null);
        if (url.contains("localhost")) {
            url = "localhost:3000";
        }
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(email);
            msg.setFrom(configService.getConfigByKey("originatorEmail").getConfigvalue());
            msg.setSubject(configService.getConfigByKey("loginMailSubject").getConfigvalue());
            msg.setText("http://" + url + "/#/verify-email/" + emailVerification.getId());
            javaMailSender.send(msg);
        } catch (Exception e) {
            System.out.println("Unable to send mail");
        }
    }
}
