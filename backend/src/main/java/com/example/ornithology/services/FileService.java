package com.example.ornithology.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.example.ornithology.models.FileEntity;
import com.example.ornithology.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
    private final FileRepository fileRepository;

    @Autowired
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileEntity save(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setName(file.getOriginalFilename());
        fileEntity.setContentType(file.getContentType());
        fileEntity.setImage(file.getBytes());
        fileEntity.setSize(file.getSize());

        return fileRepository.save(fileEntity);
    }

    public Optional<FileEntity> getFile(Long id) throws IOException {
        Optional<FileEntity> fileEntity = fileRepository.findById(id);
        if (fileEntity == null) {
            throw new FileNotFoundException("Arquivo não encontrado para o ID fornecido: " + id);
        }
        return fileEntity;
    }
    public List<FileEntity> getAllFiles() throws IOException {
        return fileRepository.findAll();
    }

//    public void deleteFile(MultipartFile file) throws IOException {
//       fileRepository.delete(fileEntity);
//
//    }
}
