package com.example.ornithology.repository;

import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.BirdModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnnotationRepository extends JpaRepository<AnnotationModel, Long> {
    List<AnnotationModel> findByBirdId (Long birdId);
}
