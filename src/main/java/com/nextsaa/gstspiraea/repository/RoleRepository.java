package com.nextsaa.gstspiraea.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.nextsaa.gstspiraea.entity.RoleDetails;

@Repository
public interface RoleRepository extends JpaRepository<RoleDetails, Long> {


}
