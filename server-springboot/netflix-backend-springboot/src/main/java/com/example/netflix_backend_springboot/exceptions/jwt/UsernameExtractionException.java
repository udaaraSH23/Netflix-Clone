package com.example.netflix_backend_springboot.exceptions.jwt;

public class UsernameExtractionException extends JwtException {
    private static final String DEFAULT_MESSAGE = "Failed to extract username from token";

    public UsernameExtractionException() {
        super(DEFAULT_MESSAGE);
    }

    public UsernameExtractionException(Throwable cause) {
        super(DEFAULT_MESSAGE, cause);
    }

    public UsernameExtractionException(String message, Throwable cause) {
        super(message, cause);
    }
}
