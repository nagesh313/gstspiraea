package com.nextsaa.gstspiraea.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Director {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String id;
    private String directorName;
    private String directorDin;
    private String directorFatherName;
    private String directorAadharNo;
    private String directorAadharPhotoCopyFront;
    private String directorAadharPhotoCopyBack;
    private String pannumber;
    private String pannumberCopy;
    private String directorResidentialAddress;
    private String directorPhoto;
}
