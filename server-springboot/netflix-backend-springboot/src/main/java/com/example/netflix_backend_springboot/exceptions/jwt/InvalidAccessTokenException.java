package com.example.netflix_backend_springboot.exceptions.jwt;
import com.example.netflix_backend_springboot.exceptions.jwt.JwtException;

public class InvalidAccessTokenException extends JwtException {
    private static final String DEFAULT_MESSAGE = "Invalid or expired access token";

    public InvalidAccessTokenException() {
        super(DEFAULT_MESSAGE);
    }

    public InvalidAccessTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidAccessTokenException(Throwable cause) {
        super(DEFAULT_MESSAGE, cause);
    }
}
