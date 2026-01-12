package com.zplus.university.repository;

import com.zplus.university.model.LearningResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningResourceRepository extends JpaRepository<LearningResource, Long> {
}
