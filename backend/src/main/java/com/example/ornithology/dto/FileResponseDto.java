package com.example.ornithology.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class FileResponseDto {

    @Id
    private String id;

    private String name;

    private String url;

    private String contentType;

    @Lob
    private byte[] image;
}
