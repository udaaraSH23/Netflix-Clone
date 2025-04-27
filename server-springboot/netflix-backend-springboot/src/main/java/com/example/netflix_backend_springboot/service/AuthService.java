package com.example.netflix_backend_springboot.service;

import com.example.netflix_backend_springboot.model.User;
import com.example.netflix_backend_springboot.model.Role; // Import Role Enum
import com.example.netflix_backend_springboot.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    public User register(User user) {
        user.setPassword(userService.encodePassword(user.getPassword()));
        user.setRole(Role.USER); // Default role set to USER
        return userService.addUser(user);
    }

    public String authenticate(String username, String password) {
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (userService.matchesPassword(password, user.getPassword())) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("role", user.getRole().name()); // Use Enum's name
            claims.put("username", user.getUsername());
            return jwtUtil.generateAccessToken(claims);
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }

    public String refreshAccessToken(String refreshToken) {
        jwtUtil.verifyRefreshToken(refreshToken); // Verify refresh token validity
        String username = jwtUtil.extractUsername(refreshToken);
        String role = jwtUtil.extractUserRole(refreshToken);

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("username", username);
        return jwtUtil.generateAccessToken(claims);
    }

    public String assignUserToAdminRole(int userId) {
        userService.assignRole(userId, Role.ADMIN.name()); // Use Enum's name
        return "User assigned to admin role successfully";
    }
}
