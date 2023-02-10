package com.example.ornithology.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BirdDto {

    private Long imageId;
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
