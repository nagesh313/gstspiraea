package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.*;
import com.nextsaa.gstspiraea.repository.*;
import com.nextsaa.gstspiraea.service.ConfigService;
import com.nextsaa.gstspiraea.util.Utility;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DataInsert {
    @Autowired
    Utility utility;
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
    PartnerRepository partnerRepository;
    @Autowired
    DirectorRepository directorRepository;
    @Autowired
    GSTCertificatesInOtherStatesRepository gstCertificatesInOtherStatesRepository;
    @Autowired
    private ConfigRepository configRepository;
    @Autowired
    private StateRepository stateRepository;

    @PostConstruct
    public void create() throws Exception {
        createStates();
        createConfig();
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

    public void createStates() {

        String[] states = new String[]{"Andaman and Nicobar Islands",
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"
        };
        List<State> stateList = new ArrayList();

        Arrays.stream(states).map(state ->
                new State(null, state, 11000)
        ).collect(Collectors.toList());
        stateRepository.saveAll(stateList);
    }

    public void createConfig() {
        Config config1 = Config.builder().configkey("payment.razorpay.key").configvalue("rzp_test_4zyGtu09Yf3TwL").build();
        Config config2 = Config.builder().configkey("payment.razorpay.secret").configvalue("km6IezoWKidIvUHBBsFR8LPs").build();
        Config config3 = Config.builder().configkey("originatorEmail").configvalue("spiraea@nextsaa.com").build();
        Config config4 = Config.builder().configkey("loginMailSubject").configvalue("Spiraea GST Login Details").build();
        Config config5 = Config.builder().configkey("loginMailBody").configvalue("Please find your login details to use for applying GST on Spiraea").build();
        configRepository.saveAll(Arrays.asList(config1, config2, config3, config4, config5));
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
        paymentPlanDetailsRepository.saveAndFlush(plan1);
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
        paymentPlanDetailsRepository.saveAndFlush(plan1);
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
        paymentPlanDetailsRepository.saveAndFlush(plan1);
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
        paymentPlanDetailsRepository.saveAndFlush(plan4);
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
        userDetailsRepository.saveAndFlush(admin);
        UserDetails user1 = new UserDetails();
        user1.setFirstName("user1");
        user1.setLastName("user1");
        user1.setUserEmail("test1@gmail.com");
        user1.setMobile(1234567489D);
        user1.setGender("Male");
        user1.setRole("Customer");
        user1.setLoginUserName("user1");
        user1.setLoginPassword("user1");
        user1.setModifiedOn(LocalDateTime.now());
        user1.setCreatedBy("admin");
        user1.setCreatedOn(LocalDateTime.now());
        user1.setVendorType("P0");
        userDetailsRepository.saveAndFlush(user1);
        UserDetails user2 = new UserDetails();
        user2.setFirstName("user2");
        user2.setLastName("user2");
        user2.setUserEmail("user2@gmail.com");
        user2.setMobile(1234567489D);
        user2.setGender("Male");
        user2.setRole("Customer");
        user2.setLoginUserName("user2");
        user2.setLoginPassword("user2");
        user2.setModifiedOn(LocalDateTime.now());
        user2.setCreatedBy("admin");
        user2.setCreatedOn(LocalDateTime.now());
        user2.setVendorType("P1");
        userDetailsRepository.saveAndFlush(user2);

        UserDetails agent1 = new UserDetails();
        agent1.setFirstName("agent1");
        agent1.setLastName("agent1");
        agent1.setUserEmail("test@gmail.com");
        agent1.setMobile(1234567489D);
        agent1.setGender("Male");
        agent1.setRole("Agent");
        agent1.setLoginUserName("agent1");
        agent1.setLoginPassword("agent1");
        agent1.setModifiedOn(LocalDateTime.now());
        agent1.setCreatedBy("admin");
        agent1.setCreatedOn(LocalDateTime.now());
        userDetailsRepository.saveAndFlush(agent1);
        UserDetails agent2 = new UserDetails();
        agent2.setFirstName("agent2");
        agent2.setLastName("agent2");
        agent2.setUserEmail("test@gmail.com");
        agent2.setMobile(1234567489D);
        agent2.setGender("Male");
        agent2.setRole("Agent");
        agent2.setLoginUserName("agent2");
        agent2.setLoginPassword("agent2");
        agent2.setModifiedOn(LocalDateTime.now());
        agent2.setCreatedBy("admin");
        agent2.setCreatedOn(LocalDateTime.now());
        userDetailsRepository.saveAndFlush(agent2);
    }

    public void createProprietorshipOrder() throws Exception {
        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();
//        
//        gstCertificatesInOtherStatesRepository.flush();
        Proprietorship proprietorship = Proprietorship.builder()
                .personName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .propfatherName("test")
                .propadharnumber("111111111111")
                .propadharphotoFront("download.jpg")
                .propadharphotoBack("download.jpg")
                .resident_address("test")
                .photo("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")

                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user1")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(utility.createOrder(new Double(10000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        proprietorshipRepostiory.saveAndFlush(proprietorship);
    }

    public void createPartnerShipOrder() throws Exception {
        Partner partner = Partner.builder()
                .partnerName("test")
                .partnerFatherName("test")
                .partnerAadharNo("111111111111")
                .partnerAadharPhotoCopyFront("test")
                .partnerAadharPhotoCopyBack("test")
                .pannumber("AAAAA1111A")
                .pannumberCopy("test")
                .partnerResidentialAddress("test")
                .partnerPhoto("test")
                .partnerMobile("test")
                .partnerEmail("test@test.com")

                .build();

        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();

        Partnership partnership = Partnership.builder()
                .partnershipid("test")
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")
                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user1")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(utility.createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .partnerList(Arrays.asList(partner))
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
                .declarationOfAuthorisedSignatory("test")
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        partnershipRepository.saveAndFlush(partnership);
    }

    public void createLLPOrder() throws Exception {
        Partner partner = Partner.builder()
                .partnerName("test")
                .partnerFatherName("test")
                .partnerAadharNo("111111111111")
                .partnerAadharPhotoCopyFront("test")
                .partnerAadharPhotoCopyBack("test")
                .pannumber("AAAAA2222D")
                .pannumberCopy("test")
                .partnerResidentialAddress("test")
                .partnerPhoto("test")
                .partnerMobile("test")
                .partnerEmail("test@test.com")

                .build();

        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();

        LLP llp = LLP.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")
                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user2")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("test")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(utility.createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .partnerList(Arrays.asList(partner))
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
                .declarationOfAuthorisedSignatory("test")
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        llpRepostiory.saveAndFlush(llp);
    }

    public void createCompanyOrder() throws Exception {
        Director director = Director.builder()
                .directorName("test")
                .directorDin("test")
                .directorFatherName("test")
                .directorAadharNo("111111111111")
                .directorAadharPhotoCopyFront("test")
                .directorAadharPhotoCopyBack("test")
                .pannumber("AAAAA1111A")
                .pannumberCopy("test")
                .directorResidentialAddress("test")
                .directorPhoto("test")
                .build();

        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();

        CompanyDetails details = CompanyDetails.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")

                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user2")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("DRAFT")
                .gstDocument("test")
//                .remark("test")
                .razorpayOrder(utility.createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .directorList(Arrays.asList(director))
                .certificateOfIncorportation("test")
                .declarationOfAuthorisedSignatory("test")
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        companyDetailsRepository.saveAndFlush(details);
    }

    public void createProprietorshipOrder1() throws Exception {
        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();

        Proprietorship proprietorship = Proprietorship.builder()
                .personName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .propfatherName("test")
                .propadharnumber("111111111111")
                .propadharphotoFront("download.jpg")
                .propadharphotoBack("download.jpg")
                .resident_address("test")
                .photo("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")

                .accountnumber("test")
                .ifsccode("test")

                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user1")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(utility.createOrder(new Double(10000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        proprietorshipRepostiory.saveAndFlush(proprietorship);
    }

    public void createPartnerShipOrder1() throws Exception {
        Partner partner = Partner.builder()
                .partnerName("test")
                .partnerFatherName("test")
                .partnerAadharNo("111111111111")
                .partnerAadharPhotoCopyFront("test")
                .partnerAadharPhotoCopyBack("test")
                .pannumber("AAAAA2222A")
                .pannumberCopy("test")
                .partnerResidentialAddress("test")
                .partnerPhoto("test")
                .partnerMobile("test")
                .partnerEmail("test@test.com")

                .build();

        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();


        Partnership partnership = Partnership.builder()
                .partnershipid("test")
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")

                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user1")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(utility.createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .partnerList(Arrays.asList(partner))
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
                .declarationOfAuthorisedSignatory("test")
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        partnershipRepository.saveAndFlush(partnership);
    }

    public void createLLPOrder1() throws Exception {
        Partner partner = Partner.builder()
                .partnerName("test")
                .partnerFatherName("test")
                .partnerAadharNo("111111111111")
                .partnerAadharPhotoCopyFront("test")
                .partnerAadharPhotoCopyBack("test")
                .pannumber("AAAAA2222A")
                .pannumberCopy("test")
                .partnerResidentialAddress("test")
                .partnerPhoto("test")
                .partnerMobile("test")
                .partnerEmail("test@test.com")

                .build();

        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();

        LLP llp = LLP.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")

                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user2")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("test")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .trading(true)
                .manufacture(true)
                .service(true)
                .razorpayOrder(utility.createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .partnerList(Arrays.asList(partner))
                .certificateOfIncorportation("test")
                .partnershipDeed("test")
                .declarationOfAuthorisedSignatory("test")
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        llpRepostiory.saveAndFlush(llp);
    }

    public void createCompanyOrder1() throws Exception {
        Director director = Director.builder()
                .directorName("test")
                .directorDin("test")
                .directorFatherName("test")
                .directorAadharNo("111111111111")
                .directorAadharPhotoCopyFront("test")
                .directorAadharPhotoCopyBack("test")
                .pannumber("AAAAA2222S")
                .pannumberCopy("test")
                .directorResidentialAddress("test")
                .directorPhoto("test")
                .build();

        GSTCertificatesInOtherStates gstCertificatesInOtherStates = GSTCertificatesInOtherStates.builder()
                .gstNumber("test")
                .gstAttachment("test")
                .build();

        CompanyDetails details = CompanyDetails.builder()
                .firmName("test")
                .legalbusinessName("test")
                .tradeName("test")
                .mobile("test")
                .email("test@test.com")
                .pannumber("AAAAA2222A")
                .panphoto("download.jpg")
                .composition("No")
                .commencementDate(new Date())
                .principleplace("test")
                .pricipleelectricityphoto("download.jpg")
                .priciplerentphoto("download.jpg")
                .priciplenocphoto("download.jpg")
                .additionalplace("test")
                .additionalelectricityphoto("download.jpg")
                .additionalrentphoto("download.jpg")
                .additionalnocphoto("download.jpg")
                .hsn1("test")
                .hsn2("test")
                .hsn3("test")
                .hsn4("test")
                .hsn5("test")

                .accountnumber("test")
                .ifsccode("test")

                .cancelcheqphoto("download.jpg")
                .tradelicensenumber("test")
                .tradelicensephoto("download.jpg")
                .isActive(true)
                .createdOn(LocalDateTime.now())
                .createdBy("user2")
                .modifiedOn(LocalDateTime.now())
                .modifiedBy("Admin")
                .status("CREATED")
                .gstDocument("test")
//                .remark("test")
                .razorpayOrder(utility.createOrder(new Double(100000)))
                .paymentPlanLocationDetails(paymentPlanLocationDetailsRepository.findAll().get(0))
                .directorList(Arrays.asList(director))
                .certificateOfIncorportation("test")
                .declarationOfAuthorisedSignatory("test")
                .gstCertificatesInOtherStates(Arrays.asList(gstCertificatesInOtherStates))
                .build();
        companyDetailsRepository.saveAndFlush(details);
    }
}
