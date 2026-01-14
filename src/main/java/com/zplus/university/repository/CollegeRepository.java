package com.zplus.university.repository;

import com.zplus.university.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {
    List<College> findByLocationContainingIgnoreCase(String location);

    @Query("SELECT c FROM College c WHERE " +
            "(:location IS NULL OR LOWER(c.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:maxFee IS NULL OR c.admissionFee <= :maxFee) AND " +
            "(:minPackage IS NULL OR c.highestPackage >= :minPackage)")
    List<College> searchColleges(String location, Double maxFee, Double minPackage);
}
