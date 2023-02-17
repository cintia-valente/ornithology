package com.example.ornithology.controllers;

import java.io.IOException;
import java.util.Optional;

import com.example.ornithology.models.FileModel;
import com.example.ornithology.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.example.ornithology.services.FileService.decompressZLib;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequestMapping(value = "/api/files",
        method = RequestMethod.POST,
        consumes = MULTIPART_FORM_DATA_VALUE)

public class FilesController {

    private final FileService fileService;

    @Autowired
    public FilesController(FileService fileService) throws IOException {
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


    @GetMapping("{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) throws IOException {
        Optional<FileModel> fileEntityOptional = fileService.getFile(id);
        if (!fileEntityOptional.isPresent()) {
            return ResponseEntity.notFound()
                    .build();
        }
        FileModel fileEntity = fileEntityOptional.get();
        return ResponseEntity.ok().body((fileEntityOptional.get().getPicByte()));
    }
}
