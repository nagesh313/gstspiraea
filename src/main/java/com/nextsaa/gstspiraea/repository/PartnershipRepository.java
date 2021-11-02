package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface PartnershipRepository extends JpaRepository<Partnership, String> {
    List<Partnership> findAllByCreatedBy(String user);
    long countByStatus(String status);
    long countByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);
    List<Partnership> findAllByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);

    long countByCreatedOnGreaterThan(LocalDateTime today);
}
