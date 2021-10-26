package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LLPRepostiory extends JpaRepository<LLP, Long> {
    List<LLP> findAllByCreatedBy(String user);
}
