package com.example.ornithology.controllers;

import com.example.ornithology.dto.AnnotationDto;
import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.services.AnnotationService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/annotation")
public class AnnotationController {

    final AnnotationService annotationService;

    public AnnotationController(AnnotationService annotationService) {
        this.annotationService = annotationService;
    }

    @PostMapping
    public ResponseEntity<Object> postAnnotation(@RequestBody AnnotationDto annotationDto) {
        var annotationModel = new AnnotationModel();
        BeanUtils.copyProperties(annotationDto, annotationModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(annotationService.save(annotationModel));
    }

    @GetMapping
    public ResponseEntity<List<AnnotationModel>> getAllAnnotation() {
        return ResponseEntity.status(HttpStatus.OK).body(annotationService.findAll());
    }

    @GetMapping("/bird/{id}")
    public ResponseEntity<List<AnnotationModel>> getByBirdId(@PathVariable(value = "id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(annotationService.findByBirdId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAnnotation(@PathVariable(value = "id") Long id,
                                                   @RequestBody AnnotationDto annotationDto) {
        Optional<AnnotationModel> annotationModelOptional = annotationService.findById(id);
        if (!annotationModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Annotation not found.");
        }
        var annotationModel = annotationModelOptional.get();
        annotationModel.setBird(annotationDto.getBird());
        annotationModel.setDate(annotationDto.getDate());;
        annotationModel.setPlace(annotationDto.getPlace());
        return ResponseEntity.status(HttpStatus.OK).body(annotationService.save(annotationModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAnnotation(@PathVariable(value = "id") Long id) {
        Optional<AnnotationModel> annotationModelOptional = annotationService.findById(id);
        if (!annotationModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Annotation not found.");
        }
        annotationService.delete(annotationModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Annotation deleted successfully.");
    }

}
