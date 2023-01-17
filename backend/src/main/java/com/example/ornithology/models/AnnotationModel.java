package com.example.ornithology.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ANNOTATION")
public class AnnotationModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bird_id", foreignKey = @ForeignKey(name = "fk_bird_annotatiton"))
    private BirdModel bird;

    @Column
    private LocalDateTime date;
    @Column(nullable = false)
    private String place;
}
