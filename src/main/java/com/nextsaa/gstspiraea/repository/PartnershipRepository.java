package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.Partnership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PartnershipRepository extends JpaRepository<Partnership, Long> {
    List<Partnership> findAllByCreatedBy(String user);
}
