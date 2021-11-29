package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.LLP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface LLPRepostiory extends JpaRepository<LLP, String> {
    List<LLP> findAllByCreatedBy(String user);

    List<LLP> findAllByCreatedByIn(List<String> user);

    long countByStatus(String status);

    long countByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);

    List<LLP> findAllByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);

    long countByCreatedOnGreaterThan(LocalDateTime today);
    List<LLP> findAllByLlpidLikeOrTradeNameLikeOrLegalbusinessNameLike(String searchText1, String searchText2, String searchText3);

    List<LLP> findAllByCreatedByInAndLlpidLikeOrTradeNameLikeOrLegalbusinessNameLike(List<String> user, String searchText1, String searchText2, String searchText3);

}
