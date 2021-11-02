package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, String> {


}
