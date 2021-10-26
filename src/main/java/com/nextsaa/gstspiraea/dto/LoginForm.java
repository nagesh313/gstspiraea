package com.nextsaa.gstspiraea.dto;

public class LoginForm {

	private String loginUserName;
	private String loginPassword;
	private String role;
	
	public String getLoginUserName() {
		return loginUserName;
	}
	public void setLoginUserName(String loginUserName) {
		this.loginUserName = loginUserName;
	}
	public String getLoginPassword() {
		return loginPassword;
	}
	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

}
