package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.*;
import com.nextsaa.gstspiraea.repository.*;
import com.nextsaa.gstspiraea.service.ConfigService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;

@Component
public class DataInsert {
    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    PaymentPlanLocationDetailsRepository paymentPlanLocationDetailsRepository;

    @Autowired
    PaymentPlanDetailsRepository paymentPlanDetailsRepository;

    @Autowired
    ProprietorshipRepostiory proprietorshipRepostiory;
    @Autowired
    PartnershipRepository partnershipRepository;
    @Autowired
    LLPRepostiory llpRepostiory;
    @Autowired
    CompanyDetailsRepository companyDetailsRepository;

    @Autowired
    private ConfigService configService;

    @PostConstruct
    public void create() throws Exception {
        createPlan1();
        createPlan2();
        createPlan3();
        createPlan4();
        paymentPlanLocationDetailsRepository.flush();
        createUsers();
        createProprietorshipOrder();
        createPartnerShipOrder();
        createLLPOrder();
        createCompanyOrder();
        createProprietorshipOrder1();
        createPartnerShipOrder1();
        createLLPOrder1();
        createCompanyOrder1();
    }

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

    public void createUsers() {
        UserDetails admin = new UserDetails();
        admin.setFirstName("admin");
        admin.setLastName("admin");
        admin.setUserEmail("test@gmail.com");
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
        user.setUserEmail("test@gmail.com");
        user.setMobile(1234567489D);
        user.setGender("Male");
        user.setRole("Customer");
        user.setLoginUserName("user");
        user.setLoginPassword("user");
        user.setModifiedOn(LocalDateTime.now());
        user.setCreatedBy("admin");
        user.setCreatedOn(LocalDateTime.now());
        user.setVendorType("P1");
        userDetailsRepository.save(user);

        UserDetails user0 = new UserDetails();
        user0.setFirstName("user0");
        user0.setLastName("user0");
        user0.setUserEmail("test1@gmail.com");
        user0.setMobile(1234567489D);
        user0.setGender("Male");
        user0.setRole("Customer");
        user0.setLoginUserName("user0");
        user0.setLoginPassword("user0");
        user0.setModifiedOn(LocalDateTime.now());
        user0.setCreatedBy("admin");
        user0.setCreatedOn(LocalDateTime.now());
        user0.setVendorType("P0");
        userDetailsRepository.save(user0);


        UserDetails agent = new UserDetails();
        agent.setFirstName("agent");
        agent.setLastName("agent");
        agent.setUserEmail("test@gmail.com");
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

    public void createProprietorshipOrder() throws Exception {
        Proprietorship proprietorship = Proprietorship.builder()
                .personName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate("test")
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .propfatherName("test")
                .propadharnumber("test")
                .propadharphotoFront("test")
                .propadharphotoBack("test")
                .resident_address("test")
                .photo("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(createOrder(new Double(10000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .gstCertificatesInOtherStates("test")
                .build();
        proprietorshipRepostiory.save(proprietorship);
    }

    public void createPartnerShipOrder() throws Exception {
        Partnership partnership = Partnership.builder()
                .partnershipid("test")
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .partnerList("test")
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
                .declarationOfAuthorisedSignatory("test")
//                .gstCertificatesInOtherStates("test")
                .build();
        partnershipRepository.save(partnership);
    }

    public void createLLPOrder() throws Exception {
        LLP llp = LLP.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("test")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .partnerList("test")
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
//                .gstCertificatesInOtherStates("test")
                .build();
        llpRepostiory.save(llp);
    }

    public void createCompanyOrder() throws Exception {
        CompanyDetails details = CompanyDetails.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .razorpayOrder(createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .directorList(Arrays.asList())
                .certificateOfIncorportation("test")
                .declarationOfAuthorisedSignatory("test")
//                .gstCertificatesInOtherStates(Arrays.asList())
                .build();
        companyDetailsRepository.save(details);
    }

    public void createProprietorshipOrder1() throws Exception {
        Proprietorship proprietorship = Proprietorship.builder()
                .personName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate("test")
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .propfatherName("test")
                .propadharnumber("test")
                .propadharphotoFront("test")
                .propadharphotoBack("test")
                .resident_address("test")
                .photo("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(createOrder(new Double(10000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .gstCertificatesInOtherStates("test")
                .build();
        proprietorshipRepostiory.save(proprietorship);
    }

    public void createPartnerShipOrder1() throws Exception {
        Partnership partnership = Partnership.builder()
                .partnershipid("test")
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .partnerList("test")
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
                .declarationOfAuthorisedSignatory("test")
//                .gstCertificatesInOtherStates("test")
                .build();
        partnershipRepository.save(partnership);
    }

    public void createLLPOrder1() throws Exception {
        LLP llp = LLP.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("test")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .partnerList("test")
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
//                .gstCertificatesInOtherStates("test")
                .build();
        llpRepostiory.save(llp);
    }

    public void createCompanyOrder1() throws Exception {
        CompanyDetails details = CompanyDetails.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test")
                .pannumber("test")
                .panphoto("test")
                .composition("test")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("test")
                .priciplerentphoto("test")
                .priciplenocphoto("test")
                .additionalplace("test")
                .additionalelectricityphoto("test")
                .additionalrentphoto("test")
                .additionalnocphoto("test")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")
                .branchname("test")
                .cancelcheqphoto("test")
                .tradelicensenumber("test")
                .tradelicensephoto("test")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .razorpayOrder(createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
//                .directorList(Arrays.asList())
                .certificateOfIncorportation("test")
                .declarationOfAuthorisedSignatory("test")
//                .gstCertificatesInOtherStates(Arrays.asList())
                .build();
        companyDetailsRepository.save(details);
    }

    private String createOrder(Double amount) throws Exception {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(
                    configService.getConfigByKey("payment.razorpay.key").getConfigvalue(),
                    configService.getConfigByKey("payment.razorpay.secret").getConfigvalue());
            JSONObject orderRequest = new JSONObject();

            Double feeAmountC = amount * 100;
            Double transactionFeesC = 2 * (feeAmountC) / 100;
            orderRequest.put("amount", feeAmountC + transactionFeesC); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", generatedOrder());
            Order order = razorpayClient.Orders.create(orderRequest);
            return order.toString();

        } catch (RazorpayException e) {
            System.out.println(e.getMessage());
            throw new Exception("Unable to create Razor Pay Order");
        }
    }

    public String generatedOrder() {
        Date dNow = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("yyMMddhhmmssMs");
        String datetime = ft.format(dNow);
        System.out.println(datetime);
        return "Order-" + datetime;
    }
}
