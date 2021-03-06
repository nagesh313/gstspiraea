package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectorRepository extends JpaRepository<Director, String> {


}
