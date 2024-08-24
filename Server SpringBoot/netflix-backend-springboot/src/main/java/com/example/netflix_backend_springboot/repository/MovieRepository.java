package com.example.netflix_backend_springboot.repository;
import com.example.netflix_backend_springboot.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByCategory(String category);
}

