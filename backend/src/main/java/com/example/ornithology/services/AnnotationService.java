package com.example.ornithology.services;

import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.repository.AnnotationRepository;
import com.example.ornithology.repository.BirdRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class AnnotationService {

    final AnnotationRepository annotationRepository;

    public AnnotationService(AnnotationRepository annotationRepository) {

        this.annotationRepository = annotationRepository;
    }
    @Transactional
    public AnnotationModel save(AnnotationModel annotationModel) {
        return annotationRepository.save(annotationModel);
    }

    public List<AnnotationModel> findAll() {
        return annotationRepository.findAll();
    }

    public Optional<AnnotationModel> findById(Long idAnnotation) {
        return annotationRepository.findById(idAnnotation);
    }

    public List<AnnotationModel> findByBirdId(Long idBird) {
        return annotationRepository.findByBirdId(idBird);
    }

    @Transactional
    public void delete(AnnotationModel annotationModel) {
        annotationRepository.delete(annotationModel);
    }
}
