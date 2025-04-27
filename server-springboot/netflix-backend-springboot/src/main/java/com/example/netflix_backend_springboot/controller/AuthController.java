package com.example.netflix_backend_springboot.controller;

import com.example.netflix_backend_springboot.dto.LoginRequest;
import com.example.netflix_backend_springboot.model.User;
import com.example.netflix_backend_springboot.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping
    public String welcome() {
        return "Auth Route Testing - OK!";
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword()); // Return the JWT token
    }
}
