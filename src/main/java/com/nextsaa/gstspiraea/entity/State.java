package com.nextsaa.gstspiraea.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
@AllArgsConstructor
public class State {

    private String name;
    private Integer amount;
}
