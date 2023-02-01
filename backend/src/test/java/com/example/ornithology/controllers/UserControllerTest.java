package com.example.ornithology.controllers;

import com.example.ornithology.dto.UserDto;
import com.example.ornithology.models.UserModel;
import com.example.ornithology.repository.UserRepository;
import com.example.ornithology.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private UserModel userModel;

    private UserDto userDto;

    private UserRepository userRepository;

    @Test
    void postUser() {
        userModel = new UserModel(
                null,
                "cintia",
                "cintia@email.com",
                "1234");

        userDto = new UserDto(
                "cintia",
                "cintia@email.com",
                "1234"
        );

        when(userService.save(userModel)).thenReturn(userModel);

        var response = assertDoesNotThrow(() -> userController.postUser(userDto));
        assertNotNull(response);
        assertEquals(ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userModel)), response);
    }

    @Test
    void getAllUser() {
        userDto = new UserDto(
                "cintia",
                "cintia@email.com",
                "1234"
        );

        var response = assertDoesNotThrow(() -> userController.getAllUser());
        assertNotNull(response);
        assertEquals(ResponseEntity.status(HttpStatus.OK).body(userService.findAll()), response);
    }

    @Test
    void updateUser() {
        userModel = new UserModel(
                null,
                "cintia",
                "cintia@email.com",
                "1234");

        userDto = new UserDto(
                "cintia",
                "cintia@email.com",
                "1234"
        );



        var response = assertDoesNotThrow(() -> userController.updateUser(userModel.getIdUser(), userDto));
        assertNotNull(response);

//       when(userService.save(userModel)).thenReturn(userModel);
//       UserModel userModel1 = userService.save(userModel);
//       assertThat(userModel1).isEqualTo(userModel);


//        assertNotNull(response);
//        assertEquals(ResponseEntity.status(HttpStatus.OK).body(userService.save(userModel)), response);


    }

    @Test
    void deleteUser() {
        userModel = new UserModel(
                null,
                "cintia",
                "cintia@email.com",
                "1234");

        var response = assertDoesNotThrow(() -> userController.deleteUser(userModel.getIdUser()));
        assertNotNull(response);

        //userController.deleteUser(userModel.getIdUser());
        //verify(userService).delete(userModel);

    }

}
