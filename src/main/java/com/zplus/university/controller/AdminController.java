package com.zplus.university.controller;

import com.zplus.university.model.College;
import com.zplus.university.model.LearningResource;
import com.zplus.university.repository.CollegeRepository;
import com.zplus.university.repository.LearningResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.zplus.university.model.User;
import com.zplus.university.repository.UserRepository;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // Allow all for dev
public class AdminController {

    @Autowired
    private CollegeRepository collegeRepository;

    @Autowired
    private LearningResourceRepository learningResourceRepository;

    @Autowired
    private UserRepository userRepository;

    // --- Teacher Approval Management ---

    @GetMapping("/users/pending-teachers")
    public List<User> getPendingTeachers() {
        return userRepository.findByRoleAndIsApproved("ROLE_TEACHER", false);
    }

    @PutMapping("/users/{id}/approve")
    public ResponseEntity<?> approveTeacher(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setApproved(true);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Teacher Approved Successfully"));
    }

    // --- College Management ---

    @PostMapping("/colleges")
    public College addCollege(@RequestBody @jakarta.validation.Valid College college) {
        return collegeRepository.save(college);
    }

    @GetMapping("/colleges")
    public List<College> getAllColleges() {
        return collegeRepository.findAll();
    }

    @PutMapping("/colleges/{id}")
    public College updateCollege(@PathVariable Long id, @RequestBody College collegeDetails) {
        College college = collegeRepository.findById(id).orElseThrow();
        college.setName(collegeDetails.getName());
        college.setLocation(collegeDetails.getLocation());
        college.setDescription(collegeDetails.getDescription());
        college.setImageUrl(collegeDetails.getImageUrl());
        college.setAdmissionFee(collegeDetails.getAdmissionFee());
        college.setAveragePackage(collegeDetails.getAveragePackage());
        college.setHighestPackage(collegeDetails.getHighestPackage());
        return collegeRepository.save(college);
    }

    @DeleteMapping("/colleges/{id}")
    public void deleteCollege(@PathVariable Long id) {
        collegeRepository.deleteById(id);
    }

    // --- Learning Resource Management ---

    @Autowired
    private com.zplus.university.service.FileService fileService;

    @PostMapping(value = "/resources", consumes = { "multipart/form-data" })
    public LearningResource addResource(
            @RequestPart("resource") LearningResource resource,
            @RequestPart(value = "file", required = false) org.springframework.web.multipart.MultipartFile file) {

        if (file != null && !file.isEmpty()) {
            String fileName = fileService.storeFile(file);
            // Append the full URL path
            resource.setContentUrl("http://localhost:8080/uploads/" + fileName);
        }

        return learningResourceRepository.save(resource);
    }

    @GetMapping("/resources")
    public List<LearningResource> getAllResources() {
        return learningResourceRepository.findAll();
    }

    @DeleteMapping("/resources/{id}")
    public void deleteResource(@PathVariable Long id) {
        learningResourceRepository.deleteById(id);
    }
}
