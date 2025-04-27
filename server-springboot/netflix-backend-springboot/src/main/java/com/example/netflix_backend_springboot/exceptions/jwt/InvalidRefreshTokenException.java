package com.example.netflix_backend_springboot.exceptions.jwt;

public class InvalidRefreshTokenException extends JwtException {
    private static final String DEFAULT_MESSAGE = "Invalid or expired refresh token";

    public InvalidRefreshTokenException() {
        super(DEFAULT_MESSAGE);
    }

    public InvalidRefreshTokenException(Throwable cause) {
        super(DEFAULT_MESSAGE, cause);
    }

    public InvalidRefreshTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
