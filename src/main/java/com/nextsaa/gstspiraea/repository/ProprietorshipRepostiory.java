package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.Proprietorship;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nextsaa.gstspiraea.entity.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface ProprietorshipRepostiory extends JpaRepository<Proprietorship, String> {
    List<Proprietorship> findAllByCreatedBy(String user);

    long countByStatus(String status);

    long countByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);
    List<Proprietorship> findAllByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);
    long countByCreatedOnGreaterThan(LocalDateTime today);
}
