package com.example.netflix_backend_springboot.exceptions.jwt;

public class UserRoleExtractionException extends JwtException {
    private static final String DEFAULT_MESSAGE = "Failed to extract user role";

    public UserRoleExtractionException() {
        super(DEFAULT_MESSAGE);
    }

    public UserRoleExtractionException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserRoleExtractionException(Throwable cause) {
        super(DEFAULT_MESSAGE, cause);
    }
}
