package com.example.netflix_backend_springboot.service;

import com.example.netflix_backend_springboot.model.User;
import com.example.netflix_backend_springboot.repository.UserRepository;
import com.example.netflix_backend_springboot.util.PasswordUtil; // Import PasswordUtil
import com.example.netflix_backend_springboot.model.Role; // Import Role enum
import com.example.netflix_backend_springboot.model.CustomUserDetails; // Import CustomUserDetails
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(int id, User user) {
        User existingUser = getUserById(id);
        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        return userRepository.save(existingUser);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String encodePassword(String password) {
        return PasswordUtil.encodePassword(password);
    }

    public boolean matchesPassword(String rawPassword, String encodedPassword) {
        return PasswordUtil.matches(rawPassword, encodedPassword);
    }

    public void assignRole(int userId, String role) {
        User user = getUserById(userId);
        try {
            Role validRole = Role.valueOf(role.toUpperCase()); // Validate role
            user.setRole(validRole);
            userRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + role);
        }
    }

    public UserDetails loadUserByUsername(String username) {
        Optional<com.example.netflix_backend_springboot.model.User> userOptional = findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with username: " + username);
        }
        return new CustomUserDetails(userOptional.get()); // Use CustomUserDetails
    }
}
