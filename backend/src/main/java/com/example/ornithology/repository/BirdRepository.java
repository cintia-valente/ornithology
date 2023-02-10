package com.example.ornithology.repository;

import com.example.ornithology.models.BirdModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BirdRepository extends JpaRepository<BirdModel, Long> {

}
