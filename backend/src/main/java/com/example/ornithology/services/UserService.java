package com.example.ornithology.services;

import com.example.ornithology.dto.UserDto;
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

    public UserModel update(Long idUser, UserDto userDto) {
        Optional<UserModel> userModelOptional  = userRepository.findById(idUser);
        var userModel = userModelOptional.get();

        userModel.setName(userDto.getName());
        userModel.setEmail(userDto.getEmail());
        userModel.setPassword(userDto.getPassword());
        return userRepository.save(userModel);
    }
    public void delete(Long idUser) {
        findById(idUser);
        userRepository.deleteById(idUser);
    }
}
