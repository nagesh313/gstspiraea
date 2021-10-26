package com.nextsaa.gstspiraea.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nextsaa.gstspiraea.entity.UserDetails;

import java.util.Optional;


@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {

    UserDetails findByLoginUserName(String username);

}
