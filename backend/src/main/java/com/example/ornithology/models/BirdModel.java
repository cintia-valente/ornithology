package com.example.ornithology.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BIRD")
public class BirdModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private Long imageId;

    @Column(nullable = false)
    private String namePtbr;

    @Column(nullable = false)
    private String nameEnglish;

    @Column(nullable = false)
    private String nameLatin;

    @Column(nullable = false)
    private String size;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String family;

    @Column(nullable = false)
    private String habitat;

}
