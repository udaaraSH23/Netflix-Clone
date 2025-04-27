package com.example.netflix_backend_springboot.service;

import com.example.netflix_backend_springboot.model.User;
import com.example.netflix_backend_springboot.repository.UserRepository;
import com.example.netflix_backend_springboot.util.JwtUtil;
import com.example.netflix_backend_springboot.util.PasswordUtil; // Import PasswordUtil
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User register(User user) {
        user.setPassword(PasswordUtil.encodePassword(user.getPassword())); // Use PasswordUtil
        return userRepository.save(user);
    }

    public String authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (PasswordUtil.matches(password, user.getPassword())) { // Use PasswordUtil
            // Generate JWT token if authentication is successful
            return jwtUtil.generateToken(username);
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
}
