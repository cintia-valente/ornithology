package com.example.ornithology.controllers;

import com.example.ornithology.controllers.AnnotationController;
import com.example.ornithology.dto.AnnotationDto;
import com.example.ornithology.dto.BirdDto;
import com.example.ornithology.dto.UserDto;
import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.models.UserModel;
import com.example.ornithology.services.AnnotationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AnnotationControllerTest {

    @InjectMocks
    private AnnotationController annotationController;

    @Mock
    private AnnotationService annotationService;

    @Mock
    private AnnotationModel annotationModel;

    private AnnotationDto annotationDto;
    private BirdDto birdDto;
    private BirdModel birdModel;

    @Test
    void postAnnotation() {
        birdModel = new BirdModel(
                null,
                null,
                "Canário",
                "Blue-and-yellow Macaw",
                "Ara ararauna",
                "90 cm",
                "Can",
                "Amarelo",
                "Psittacidae",
                "Floresta"
        );

        annotationModel = new AnnotationModel(
                null,
                new BirdModel(
                        null,
                        null,
                        "Canário",
                        "Blue-and-yellow Macaw",
                        "Ara ararauna",
                        "90 cm",
                        "Can",
                        "Amarelo",
                        "Psittacidae",
                        "Floresta"
                ),
                null,
                "Amazonas"
        );

        annotationDto = new AnnotationDto(
                new BirdModel(
                        null,
                        null,
                        "Canário",
                        "Blue-and-yellow Macaw",
                        "Ara ararauna",
                        "90 cm",
                        "Can",
                        "Amarelo",
                        "Psittacidae",
                        "Floresta"
                ),
                null,
                "Amazonas"
        );


        when(annotationService.save(annotationModel)).thenReturn(annotationModel);

        var response = assertDoesNotThrow(() -> annotationController.postAnnotation(annotationDto));
        assertNotNull(response);
        assertEquals(ResponseEntity.status(HttpStatus.CREATED).body(annotationService.save(annotationModel)), response);

    }

    @Test
    void getAllAnnotation() {
//        annotationDto = new AnnotationDto(
//                new BirdModel(
//                        null,
//                        null,
//                        "Canário",
//                        "Blue-and-yellow Macaw",
//                        "Ara ararauna",
//                        "90 cm",
//                        "Can",
//                        "Amarelo",
//                        "Psittacidae",
//                        "Floresta"
//                ),
//                null,
//                "Amazonas"
//        );


        var response = assertDoesNotThrow(() -> annotationController.getAllAnnotation());
        assertNotNull(response);
        assertEquals(ResponseEntity.status(HttpStatus.OK).body(annotationService.findAll()), response);
    }

    @Test
    void updateAnnotation() {
        birdModel = new BirdModel(
                null,
                null,
                "Canário",
                "Blue-and-yellow Macaw",
                "Ara ararauna",
                "90 cm",
                "Can",
                "Amarelo",
                "Psittacidae",
                "Floresta"
        );

        annotationModel = new AnnotationModel(
                null,
                new BirdModel(
                        null,
                        null,
                        "Canário",
                        "Blue-and-yellow Macaw",
                        "Ara ararauna",
                        "90 cm",
                        "Can",
                        "Amarelo",
                        "Psittacidae",
                        "Floresta"
                ),
                null,
                "Amazonas"
        );

        annotationDto = new AnnotationDto(
                new BirdModel(
                        null,
                        null,
                        "Canário",
                        "Blue-and-yellow Macaw",
                        "Ara ararauna",
                        "90 cm",
                        "Can",
                        "Amarelo",
                        "Psittacidae",
                        "Floresta"
                ),
                null,
                "Amazonas"
        );


        var response = assertDoesNotThrow(() -> annotationController.updateAnnotation(annotationModel.getId(), annotationDto));
        assertNotNull(response);

    }

    @Test
    void deleteAnnotation() {
        birdModel = new BirdModel(
                null,
                null,
                "Canário",
                "Blue-and-yellow Macaw",
                "Ara ararauna",
                "90 cm",
                "Can",
                "Amarelo",
                "Psittacidae",
                "Floresta"
        );

        annotationModel = new AnnotationModel(
                null,
                new BirdModel(
                        null,
                        null,
                        "Canário",
                        "Blue-and-yellow Macaw",
                        "Ara ararauna",
                        "90 cm",
                        "Can",
                        "Amarelo",
                        "Psittacidae",
                        "Floresta"
                ),
                null,
                "Amazonas"
        );

        var response = assertDoesNotThrow(() -> annotationController.deleteAnnotation(annotationModel.getId()));
        assertNotNull(response);

    }
}
