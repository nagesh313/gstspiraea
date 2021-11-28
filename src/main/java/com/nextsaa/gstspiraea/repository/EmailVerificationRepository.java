package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification, String> {


}
