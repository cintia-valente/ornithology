package com.example.ornithology.services;

import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.BirdModel;
import com.example.ornithology.models.UserModel;
import com.example.ornithology.repository.BirdRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BirdService {

    final BirdRepository birdRepository;

    public BirdService(BirdRepository birdRepository) {

        this.birdRepository = birdRepository;
    }

    @Transactional
    public BirdModel save(BirdModel birdModel) {
        return birdRepository.save(birdModel);
    }

    public List<BirdModel> findAll() {
        return birdRepository.findAll();
    }

    public Optional<BirdModel> findById(Long idBird) {
        return birdRepository.findById(idBird);
    }

    @Transactional
    public void delete(BirdModel birdModel) {
        birdRepository.delete(birdModel);
    }
}
