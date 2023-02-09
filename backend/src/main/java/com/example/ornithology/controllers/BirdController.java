package com.example.ornithology.controllers;

import com.example.ornithology.dto.BirdDto;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.services.BirdService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/bird")
public class BirdController {

    final BirdService birdService;

    public BirdController(BirdService birdService) {
        this.birdService = birdService;
    }

    @PostMapping
    public ResponseEntity<Object> postBird(@RequestBody BirdDto birdDto) {
        var birdModel = new BirdModel();
        BeanUtils.copyProperties(birdDto, birdModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(birdService.save(birdModel));
    }

    @GetMapping
    public ResponseEntity<List<BirdModel>> getAllBird() {
        return ResponseEntity.status(HttpStatus.OK).body(birdService.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBird(@PathVariable(value = "id") Long id) {
        birdService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
