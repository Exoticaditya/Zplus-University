package com.zplus.university.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class College {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @jakarta.validation.constraints.NotBlank(message = "Name is required")
    private String name;

    @jakarta.validation.constraints.NotBlank(message = "Location is required")
    private String location;

    @jakarta.validation.constraints.Size(max = 500, message = "Description too long")
    private String description;

    private String imageUrl;

    // Financial & Placement Stats
    private Double admissionFee; // per year
    private Double averagePackage; // in LPA
    private Double highestPackage; // in LPA

    public College() {
    }

    public College(Long id, String name, String location, String description, String imageUrl) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getAdmissionFee() {
        return admissionFee;
    }

    public void setAdmissionFee(Double admissionFee) {
        this.admissionFee = admissionFee;
    }

    public Double getAveragePackage() {
        return averagePackage;
    }

    public void setAveragePackage(Double averagePackage) {
        this.averagePackage = averagePackage;
    }

    public Double getHighestPackage() {
        return highestPackage;
    }

    public void setHighestPackage(Double highestPackage) {
        this.highestPackage = highestPackage;
    }
}
