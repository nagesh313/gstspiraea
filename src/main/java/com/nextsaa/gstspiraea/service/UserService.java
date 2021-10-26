package com.nextsaa.gstspiraea.service;


import java.util.List;

import com.nextsaa.gstspiraea.dto.UserDetailsDTO;

import javax.naming.AuthenticationException;

public interface UserService {

    UserDetailsDTO getUserById(Long id);
    
    List<UserDetailsDTO> getAllUsers();

    UserDetailsDTO createUser(UserDetailsDTO userDetailsDTO);

    UserDetailsDTO updateEmployee(UserDetailsDTO userDetailsDTO);

    UserDetailsDTO updateLoginDetails(UserDetailsDTO userDetailsDTO);

    Boolean checkLoginDetails(String username, String password, String role) throws AuthenticationException;
}
