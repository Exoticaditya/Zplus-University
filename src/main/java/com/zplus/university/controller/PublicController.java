package com.zplus.university.controller;

import com.zplus.university.model.College;
import com.zplus.university.model.LearningResource;
import com.zplus.university.repository.CollegeRepository;
import com.zplus.university.repository.LearningResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {

    @Autowired
    private CollegeRepository collegeRepository;

    @Autowired
    private LearningResourceRepository learningResourceRepository;

    @GetMapping("/colleges")
    public List<College> getAllColleges() {
        return collegeRepository.findAll();
    }

    @GetMapping("/colleges/search")
    public List<College> searchColleges(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double maxFee,
            @RequestParam(required = false) Double minPackage) {
        return collegeRepository.searchColleges(location, maxFee, minPackage);
    }

    @GetMapping("/colleges/{id}")
    public College getCollegeById(@PathVariable Long id) {
        return collegeRepository.findById(id).orElseThrow(() -> new RuntimeException("College not found"));
    }

    @GetMapping("/resources")
    public List<LearningResource> getAllResources() {
        return learningResourceRepository.findAll();
    }
}
