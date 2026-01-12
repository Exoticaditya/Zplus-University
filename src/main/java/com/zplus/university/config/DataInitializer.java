package com.zplus.university.config;

import com.zplus.university.model.College;
import com.zplus.university.model.LearningResource;
import com.zplus.university.model.User;
import com.zplus.university.repository.CollegeRepository;
import com.zplus.university.repository.LearningResourceRepository;
import com.zplus.university.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(CollegeRepository collegeRepository,
            LearningResourceRepository resourceRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Admin
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User("admin", passwordEncoder.encode("admin123"), "ROLE_ADMIN", "System Admin",
                        "admin@zplus.com");
                userRepository.save(admin);
                System.out.println("Seeded Admin User");
            }

            // Seed Teacher
            if (!userRepository.existsByUsername("teacher")) {
                User teacher = new User("teacher", passwordEncoder.encode("teacher123"), "ROLE_TEACHER",
                        "Prof. Severus", "teacher@zplus.com");
                userRepository.save(teacher);
                System.out.println("Seeded Teacher User");
            }

            // Seed Student
            if (!userRepository.existsByUsername("student")) {
                User student = new User("student", passwordEncoder.encode("student123"), "ROLE_STUDENT", "Harry P.",
                        "student@zplus.com");
                userRepository.save(student);
                System.out.println("Seeded Student User");
            }

            // Existing Data Seeding...
            if (collegeRepository.count() == 0) {
                collegeRepository.save(new College(null, "IIT Bombay", "Mumbai", "Premier institute.",
                        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"));
                collegeRepository.save(new College(null, "BITS Pilani", "Pilani", "Innovation hub.",
                        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"));
                System.out.println("Sample Colleges Added");
            }

            if (resourceRepository.count() == 0) {
                resourceRepository.save(new LearningResource(null, "Data Structures Notes", "NOTE", "Computer Science",
                        "https://example.com/ds-notes.pdf", "BTech", "3", "Notes"));
                resourceRepository.save(new LearningResource(null, "Marketing Management Class 1", "CLASS", "Marketing",
                        "https://youtube.com/watch?v=example", "MBA", "2", "Video Lectures"));
                resourceRepository
                        .save(new LearningResource(null, "Algorithm Assignment 1", "ASSIGNMENT", "Computer Science",
                                "https://example.com/algo-assign.pdf", "BTech", "3", "Assignments"));
                System.out.println("Sample Resources Added");
            }
        };
    }
}
