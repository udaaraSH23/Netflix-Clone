package com.example.netflix_backend_springboot.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Replace with actual user fetching logic from database
        if ("testuser".equals(username)) {
            return new User("testuser", "$2a$10$7QJ8QhQ8J8QhQ8J8QhQ8J8QhQ8J8QhQ8J8QhQ8J8QhQ8J8QhQ8J8", new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
