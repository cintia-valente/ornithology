package com.example.ornithology.repository;

import com.example.ornithology.models.AnnotationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AnnotationRepository extends JpaRepository<AnnotationModel, Long> {
    List<AnnotationModel> findByBirdId (Long birdId);
}
