package com.nextsaa.gstspiraea.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Data
public class PaymentPlanDetails {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;
    @OneToMany
    private List<PaymentPlanLocationDetails> payplanLocation;
    private String payplanname;
    private String remarks;
}

