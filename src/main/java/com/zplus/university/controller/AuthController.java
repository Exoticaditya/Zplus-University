package com.zplus.university.controller;

import com.zplus.university.model.User;
import com.zplus.university.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username is already taken!"));
        }

        // Set Default Role if missing (Safety net)
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_STUDENT");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(java.security.Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "role", user.getRole(),
                "fullName", user.getFullName() != null ? user.getFullName() : user.getUsername(),
                "approved", user.isApproved()));
    }
}
