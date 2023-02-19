package com.example.ornithology.controllers;

import com.example.ornithology.dto.DataAuthentication;
//import com.example.ornithology.models.UserModel;
//import com.example.ornithology.security.TokenService;
import com.example.ornithology.models.UserModel;
import com.example.ornithology.security.DataTokenJWT;
import com.example.ornithology.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/login")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity logIn(@RequestBody @Valid DataAuthentication dataAuthentication) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dataAuthentication.login(), dataAuthentication.password());
        var authentication = authenticationManager.authenticate(authenticationToken);

        var tokenJWT = tokenService.generateToken((UserModel) authentication.getPrincipal());

        return ResponseEntity.ok(new DataTokenJWT(tokenJWT));
    }

}
