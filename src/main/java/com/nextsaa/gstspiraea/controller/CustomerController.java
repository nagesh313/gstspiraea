//package com.nextsaa.gstspiraea.controller;
//
//
//import java.util.Map;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import com.nextsaa.gstspiraea.dto.GSTApplicationType;
//import com.nextsaa.gstspiraea.service.UserService;
//
//@Controller
//public class CustomerController {
//	@Autowired
//	UserService userService;
//
//	@RequestMapping("/getGSTForm")
//	public String getGSTForm(Map<String, Object> model) {
//			return "GSTApplication";
//	}
//
//	@RequestMapping("/applyGST")
//	public String getGSTForm(@ModelAttribute("GSTApplicationType") GSTApplicationType gstapplicationType,Map<String, Object> model) {
//		if(gstapplicationType.getBusinessType().equalsIgnoreCase("Proprietorship")) {
//			return "Proprietorship";
//		}else if(gstapplicationType.getBusinessType().equalsIgnoreCase("Partnership")){
//			return "Partnership";
//		}else if(gstapplicationType.getBusinessType().equalsIgnoreCase("LLP")) {
//			return "LLP";
//		}else if(gstapplicationType.getBusinessType().equalsIgnoreCase("Company")) {
//			return "Company";
//		}
//		return "GSTApplication";
//	}
//
//}
