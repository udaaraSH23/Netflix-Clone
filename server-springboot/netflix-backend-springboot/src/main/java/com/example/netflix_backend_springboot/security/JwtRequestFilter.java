package com.example.netflix_backend_springboot.security;

import com.example.netflix_backend_springboot.service.UserService;
import com.example.netflix_backend_springboot.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import io.jsonwebtoken.JwtException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // Utility class for handling JWT operations like extracting username and validating tokens.

    @Autowired
    private UserService userDetailsService; // Service to load user details from the database.

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Extract the Authorization header from the HTTP request.
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // Check if the Authorization header is present and starts with "Bearer ".
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Extract the JWT token by removing the "Bearer " prefix.
            try {
                username = jwtUtil.extractUsername(jwt); // Extract the username from the JWT token.
            } catch (JwtException e) {
                // Handle invalid JWT token (e.g., expired or malformed).
            }
        }

        // If a username is extracted and no authentication is set in the SecurityContext.
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Load user details from the database using the extracted username.
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Validate the JWT token against the loaded user details.
            if (jwtUtil.validateToken(jwt, userDetails)) {

                // Create an authentication token for the user.
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                // Set additional details for the authentication token (e.g., request details).
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication token in the SecurityContext.
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        // Continue the filter chain to process the next filter or the request itself.
        chain.doFilter(request, response);
    }

}