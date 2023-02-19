package com.example.ornithology.services;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import com.example.ornithology.models.FileModel;
import com.example.ornithology.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
    private final FileRepository fileRepository;

    @Autowired
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileModel save(MultipartFile file) throws IOException {
        FileModel fileModel = new FileModel();
        fileModel.setName(file.getOriginalFilename());
        fileModel.setContentType(file.getContentType());
        fileModel.setPicByte(file.getBytes());
        fileModel.setSize(file.getSize());

        return fileRepository.save(fileModel);
    }

    public Optional<FileModel> getFile(Long id) throws IOException {
        return fileRepository.findById(id);
    }
    public List<FileModel> getAllFiles() throws IOException {
        return fileRepository.findAll();
    }

    public String saveImageFile(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path uploadDir = Paths.get("uploads");

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException e) {
            throw new IOException("Could not save file: " + fileName, e);
        }
    }


    public static byte[] compressZLib(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }// uncompress the image bytes before returning it to the angular application

    public static byte[] decompressZLib(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];

        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }    return outputStream.toByteArray();}



//    public void deleteFile(MultipartFile file) throws IOException {
//       fileRepository.delete(fileEntity);
//
//    }
}
