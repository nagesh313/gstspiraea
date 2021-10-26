package com.nextsaa.gstspiraea.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nextsaa.gstspiraea.entity.Config;

@Repository
public interface ConfigRepository extends JpaRepository<Config, Long> {

	Config findByConfigkey(String configKey);
}
