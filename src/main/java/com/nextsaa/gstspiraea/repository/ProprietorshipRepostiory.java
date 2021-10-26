package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.Proprietorship;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nextsaa.gstspiraea.entity.UserDetails;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProprietorshipRepostiory extends JpaRepository<Proprietorship, Long> {
    List<Proprietorship> findAllByCreatedBy(String user);
}