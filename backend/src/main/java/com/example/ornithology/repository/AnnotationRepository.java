package com.example.ornithology.repository;

import com.example.ornithology.models.AnnotationModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnotationRepository extends JpaRepository<AnnotationModel, Long> {
    List<AnnotationModel> findByBirdId (Long birdId);
}
