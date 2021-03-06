package com.nextsaa.gstspiraea.repository;

import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompanyDetailsRepository extends JpaRepository<CompanyDetails, String> {
    List<CompanyDetails> findAllByCreatedBy(String user);

    List<CompanyDetails> findAllByCreatedByIn(List<String> user);

    long countByStatus(String status);

    long countByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);

    List<CompanyDetails> findAllByStatusAndCreatedOnGreaterThan(String status, LocalDateTime today);

    long countByCreatedOnGreaterThan(LocalDateTime today);
    List<CompanyDetails> findAllByCompanydetailsidLikeOrTradeNameLikeOrLegalbusinessNameLike(String searchText1, String searchText2, String searchText3);

    List<CompanyDetails> findAllByCreatedByInAndCompanydetailsidLikeOrTradeNameLikeOrLegalbusinessNameLike(List<String> user, String searchText1, String searchText2, String searchText3);

}
