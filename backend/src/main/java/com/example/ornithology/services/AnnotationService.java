package com.example.ornithology.services;

import com.example.ornithology.dto.AnnotationDto;
import com.example.ornithology.dto.UserDto;
import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.models.UserModel;
import com.example.ornithology.repository.AnnotationRepository;
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

    public AnnotationModel update(Long idAnnotation, AnnotationDto annotationDto) {
        Optional<AnnotationModel> annotationModelOptional  = annotationRepository.findById(idAnnotation);

        var annotationModel = annotationModelOptional.get();

        annotationModel.setBird(annotationDto.getBird());
        annotationModel.setDate(annotationDto.getDate());
        annotationModel.setPlace(annotationDto.getPlace());
        return annotationRepository.save(annotationModel);
    }

    @Transactional
    public void delete(Long idAnnotation) {
        findById(idAnnotation);
        annotationRepository.deleteById(idAnnotation);
    }
}
