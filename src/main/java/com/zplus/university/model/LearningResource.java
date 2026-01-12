package com.zplus.university.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LearningResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @jakarta.validation.constraints.NotBlank(message = "Title is required")
    private String title;

    private String type; // NOTE or CLASS

    @jakarta.validation.constraints.NotBlank(message = "Subject is required")
    private String subject;

    private String contentUrl; // Link to PDF or Video

    // New Fields for Structured Study
    private String branch; // MBA, BTech, BBA
    private String semester; // 1, 2, 3...
    private String resourceCategory; // Notes, PYQ, Syllabus, Lab Manual

    public LearningResource() {
    }

    public LearningResource(Long id, String title, String type, String subject, String contentUrl, String branch,
            String semester, String resourceCategory) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.subject = subject;
        this.contentUrl = contentUrl;
        this.branch = branch;
        this.semester = semester;
        this.resourceCategory = resourceCategory;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getResourceCategory() {
        return resourceCategory;
    }

    public void setResourceCategory(String resourceCategory) {
        this.resourceCategory = resourceCategory;
    }
}
