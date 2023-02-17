package com.example.ornithology.services;

import com.example.ornithology.dto.BirdResponseDto;
import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.models.FileEntity;
import com.example.ornithology.repository.BirdRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BirdService {

    final BirdRepository birdRepository;
    final FileService fileService;

    public BirdService(BirdRepository birdRepository, FileService fileService) {

        this.birdRepository = birdRepository;
        this.fileService = fileService;
    }

    @Transactional
    public BirdModel save(BirdModel birdModel, MultipartFile file) throws IOException {
        var fileResponse  = fileService.save(file);
        birdModel.setImageId(fileResponse.getId());
        return birdRepository.save(birdModel);
    }

    public List<BirdModel> findAll() throws IOException {
        var birdResponse = new BirdResponseDto();
        var birdList = birdRepository.findAll();

        birdList.forEach(bird -> {
            try {
                birdResponse.setFile(this.fileService.getFile(bird.getImageId()));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

//        fileService.getAllFiles();
//        return birdRepository.findAll();
        return birdList;
    }

    public Optional<BirdModel> findById(Long idBird) throws IOException {
        fileService.getFile(idBird);
        return birdRepository.findById(idBird);
    }

//    @Transactional
//    public void delete(BirdModel birdModel) throws IOException {
//
//        fileService.deleteFile(birdModel);
//    }


}
