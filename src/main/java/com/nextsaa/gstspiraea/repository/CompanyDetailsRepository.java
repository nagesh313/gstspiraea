package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompanyDetailsRepository extends JpaRepository<CompanyDetails, Long> {
    List<CompanyDetails> findAllByCreatedBy(String user);

    long countByStatus(String status);

    long countByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);

    List<CompanyDetails> findAllByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);

    long countByCreatedOnGreaterThan(LocalDateTime today);

}
