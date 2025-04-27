package com.example.netflix_backend_springboot.util;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final String ACCESS_TOKEN_SECRET = "your_access_token_secret";
    private final String REFRESH_TOKEN_SECRET = "your_refresh_token_secret";
    private final long ACCESS_TOKEN_EXPIRY = 1000 * 60 * 60 * 2; // 2 hours
    private final long REFRESH_TOKEN_EXPIRY = 1000 * 60 * 60 * 24 * 7; // 7 days

    // Generates an access token with the given payload and expiry time
    public String generateAccessToken(Map<String, Object> payload) {
        return Jwts.builder()
                .setClaims(payload)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRY))
                .signWith(SignatureAlgorithm.HS256, ACCESS_TOKEN_SECRET)
                .compact();
    }

    // Generates a refresh token with the given payload and expiry time
    public String generateRefreshToken(Map<String, Object> payload) {
        return Jwts.builder()
                .setClaims(payload)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRY))
                .signWith(SignatureAlgorithm.HS256, REFRESH_TOKEN_SECRET)
                .compact();
    }

    // Generates an access token with username and role claims
    public String generateTokenWithClaims(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("sub", username);
        return generateAccessToken(claims);
    }

    // Verifies the validity of the access token and returns its claims
    public Claims verifyAccessToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(ACCESS_TOKEN_SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid or expired access token");
        }
    }

    // Verifies the validity of the refresh token and returns its claims
    public Claims verifyRefreshToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(REFRESH_TOKEN_SECRET)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid or expired refresh token");
        }
    }

    // Extracts claims from a refresh token
    public Map<String, Object> extractClaimsFromRefreshToken(String token) {
        Claims claims = verifyRefreshToken(token);
        Map<String, Object> extractedClaims = new HashMap<>();
        extractedClaims.put("username", claims.getSubject());
        extractedClaims.put("role", claims.get("role", String.class));
        return extractedClaims;
    }

    // Extracts the user role from the access token
    public String extractUserRole(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(ACCESS_TOKEN_SECRET)
                    .parseClaimsJws(token)
                    .getBody();
            return claims.get("role", String.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract user role");
        }
    }

    // Extracts the username from the JWT token
    public String extractUsername(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(ACCESS_TOKEN_SECRET)
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract username from token");
        }
    }
}
