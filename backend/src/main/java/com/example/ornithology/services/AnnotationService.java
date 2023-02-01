package com.example.ornithology.services;

import com.example.ornithology.dto.AnnotationDto;
import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.repository.AnnotationRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class AnnotationService {

    final AnnotationRepository annotationRepository;
    final BirdService birdService;

    public AnnotationService(AnnotationRepository annotationRepository, BirdService birdService) {

        this.annotationRepository = annotationRepository;
        this.birdService = birdService;
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
        Optional<BirdModel> birdModelOptional = birdService.findById(annotationModelOptional.get().getBird().getId());

        birdModelOptional.get().setImage(annotationDto.getBird().getImage());
        birdModelOptional.get().setNamePtbr(annotationDto.getBird().getNamePtbr());
        birdModelOptional.get().setNameEnglish(annotationDto.getBird().getNameEnglish());
        birdModelOptional.get().setNameLatin(annotationDto.getBird().getNameLatin());
        birdModelOptional.get().setSize(annotationDto.getBird().getSize());
        birdModelOptional.get().setGenre(annotationDto.getBird().getGenre());
        birdModelOptional.get().setColor(annotationDto.getBird().getColor());
        birdModelOptional.get().setFamily(annotationDto.getBird().getFamily());
        birdModelOptional.get().setHabitat(annotationDto.getBird().getHabitat());
        birdService.save(birdModelOptional.get());

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
