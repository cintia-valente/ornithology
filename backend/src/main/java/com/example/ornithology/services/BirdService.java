package com.example.ornithology.services;

import com.example.ornithology.dto.BirdResponseDto;
import com.example.ornithology.models.BirdModel;
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

       return birdRepository.findAll();
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
