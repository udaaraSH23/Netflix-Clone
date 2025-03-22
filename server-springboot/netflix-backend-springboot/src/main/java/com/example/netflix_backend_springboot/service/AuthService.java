package com.example.netflix_backend_springboot.service;

import com.example.netflix_backend_springboot.model.User;
import com.example.netflix_backend_springboot.repository.UserRepository;
import com.example.netflix_backend_springboot.util.JwtUtil; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil; 

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil; 
    }

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            // Generate JWT token if authentication is successful
            return jwtUtil.generateToken(username);
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
}
