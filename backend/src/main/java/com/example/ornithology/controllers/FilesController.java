package com.example.ornithology.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.ornithology.dto.BirdDto;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.models.FileEntity;
import com.example.ornithology.models.FileResponse;

import com.example.ornithology.services.BirdService;
import com.example.ornithology.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping(value = "files",
        method = RequestMethod.POST,
        consumes = MULTIPART_FORM_DATA_VALUE)

public class FilesController {

    private final FileService fileService;

    @Autowired
    public FilesController(FileService fileService) {
        this.fileService = fileService;
    }
//
//    @PostMapping
//    @ResponseStatus(CREATED)
//    @RequestMapping(consumes = MULTIPART_FORM_DATA_VALUE)
//
//    public ResponseEntity<BirdDto> upload(@RequestParam("bird") BirdDto birdDto,
//                                          @RequestParam(value = "file", required = false)
//                                              MultipartFile file) {
//        throws IOException {
//
//        }
//    }
//
//    @GetMapping
//    public List<FileResponse> list() {
//        return fileService.getAllFiles()
//                .stream()
//                .map(this::mapToFileResponse)
//                .collect(Collectors.toList());
//    }
//toList
//    private FileResponse mapToFileResponse(FileEntity fileEntity) {
//        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/files/")
//                .path(fileEntity.getId())
//                .toUriString();
//        FileResponse fileResponse = new FileResponse();
//        fileResponse.setId(fileEntity.getId());
//        fileResponse.setName(fileEntity.getName());
//        fileResponse.setContentType(fileEntity.getContentType());
//        fileResponse.setSize(fileEntity.getSize());
//        fileResponse.setUrl(downloadURL);
//
//        return fileResponse;
//    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Optional<FileEntity> fileEntityOptional = fileService.getFile(id);

        if (!fileEntityOptional.isPresent()) {
            return ResponseEntity.notFound()
                    .build();
        }

        FileEntity fileEntity = fileEntityOptional.get();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getName() + "\"")
                .contentType(MediaType.valueOf(fileEntity.getContentType()))
                .body(fileEntity.getImage());
    }
}
