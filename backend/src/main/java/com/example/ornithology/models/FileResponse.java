package com.example.ornithology.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class FileResponse {

    @Id
    private String id;

    private String name;

    private Long size;

    private String url;

    private String contentType;
}
