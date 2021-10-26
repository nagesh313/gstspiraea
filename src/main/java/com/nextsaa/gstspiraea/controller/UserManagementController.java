//package com.nextsaa.gstspiraea.controller;
//
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.RequestMapping;
//import com.nextsaa.gstspiraea.dto.UserDetailsDTO;
//import com.nextsaa.gstspiraea.service.UserService;
//
//@Controller
//public class UserManagementController {
//	@Autowired
//	UserService userService;
//
//	@RequestMapping("/getUsersList")
//	public String getGSTForm(@ModelAttribute("SpringWeb") UserDetailsDTO userDetails,Map<String, Object> model) {
//		model.put("userList", userService.getAllUsers());
//		return "user_management";
//	}
//
//	@RequestMapping("/generateLoginDetails")
//	public String generateLoginDetails(@ModelAttribute("userDetails") UserDetailsDTO user, Map<String, Object> model) {
//		userService.updateLoginDetails(user);
//		model.put("userList", userService.getAllUsers());
//		return "user_management";
//	}
//
//}
