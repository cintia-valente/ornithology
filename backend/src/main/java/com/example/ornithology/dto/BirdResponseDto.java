package com.example.ornithology.dto;

import com.example.ornithology.models.FileEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BirdResponseDto {

    private Optional<FileEntity> file;
    @NotBlank
    private String namePtbr;
    @NotBlank
    private String nameEnglish;
    @NotBlank
    private String nameLatin;
    @NotBlank
    private String size;
    @NotBlank
    private String genre;
    @NotBlank
    private String color;
    @NotBlank
    private String family;
    @NotBlank
    private String habitat;

}
