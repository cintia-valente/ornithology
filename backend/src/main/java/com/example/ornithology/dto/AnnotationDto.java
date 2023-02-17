package com.example.ornithology.dto;

import com.example.ornithology.models.BirdModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationDto {

    @NotBlank
    private BirdModel bird;
    @NotBlank
    private LocalDateTime date;
    @NotBlank
    private String place;
}
