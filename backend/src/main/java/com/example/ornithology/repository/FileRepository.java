package com.example.ornithology.repository;

import com.example.ornithology.dto.AnnotationDto;
import com.example.ornithology.models.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {

}