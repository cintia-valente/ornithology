package com.example.ornithology.controllers;

import com.example.ornithology.dto.BirdDto;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.services.BirdService;
import com.example.ornithology.services.FileService;
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

//    @PostMapping
//    public ResponseEntity<Object> postBird(@RequestBody BirdDto birdDto) {
//        var birdModel = new BirdModel();
//        BeanUtils.copyProperties(birdDto, birdModel);
//        return ResponseEntity.status(HttpStatus.CREATED).body(birdService.save(birdModel));
//    }

    @PostMapping
    @ResponseStatus(CREATED)
    @RequestMapping(consumes = MULTIPART_FORM_DATA_VALUE)

    public ResponseEntity<BirdModel> upload(
                                          @RequestParam(value = "file", required = false)
                                          MultipartFile file, @RequestParam("bird") BirdDto bird) throws IOException {

            var birdModel = new BirdModel();
            BeanUtils.copyProperties(bird, birdModel);

            var fileResponse  = fileService.save(file);
            birdModel.setImageId(fileResponse.getId());
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
