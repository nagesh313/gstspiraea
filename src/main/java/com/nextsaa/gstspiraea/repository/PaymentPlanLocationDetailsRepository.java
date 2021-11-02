package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.PaymentPlanLocationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PaymentPlanLocationDetailsRepository extends JpaRepository<PaymentPlanLocationDetails, String> {

}
