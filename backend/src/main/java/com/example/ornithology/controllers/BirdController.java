package com.example.ornithology.controllers;

import com.example.ornithology.dto.BirdResponseDto;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.services.BirdService;
import com.example.ornithology.services.FileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/api/bird")
public class BirdController {

    final BirdService birdService;
    final FileService fileService;

    public BirdController(BirdService birdService, FileService fileService) {
        this.birdService = birdService;
        this.fileService = fileService;
    }

    @PostMapping
    @ResponseStatus(CREATED)
    @RequestMapping(consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BirdModel> upload(@RequestParam("bird") String bird,
                                            @RequestParam(value = "file", required = false) MultipartFile file)
            throws IOException {

        var birdModel = new BirdModel();

        BirdResponseDto birdDto = new ObjectMapper().readValue(bird, BirdResponseDto.class);
        BeanUtils.copyProperties(birdDto, birdModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(birdService.save(birdModel, file));

    }

    @GetMapping
    public ResponseEntity<List<BirdModel>> getAllBird() throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(birdService.findAll());
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Object> deleteBird(@RequestParam("bird") String bird) throws IOException {
//        birdService.delete(bird);
//        return ResponseEntity.noContent().build();
//    }


}
