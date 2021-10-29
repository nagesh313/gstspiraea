package com.nextsaa.gstspiraea.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
public class PaymentPlanDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany
    private List<PaymentPlanLocationDetails> payplanLocation;
    private String payplanname;
    private String remarks;
}

