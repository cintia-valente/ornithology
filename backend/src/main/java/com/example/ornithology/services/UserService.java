package com.example.ornithology.services;

import com.example.ornithology.models.AnnotationModel;
import com.example.ornithology.models.UserModel;
import com.example.ornithology.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    final UserRepository userRepository;

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Transactional
    public UserModel save(UserModel userModel) {
        return userRepository.save(userModel);
    }

    public List<UserModel> findAll() {
        return  userRepository.findAll();
    }

    public Optional<UserModel> findById(Long idUser) {
        return userRepository.findById(idUser);
    }

    public void delete(UserModel userModel) {
        userRepository.delete(userModel);
    }
}
