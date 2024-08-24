package com.example.netflix_backend_springboot.service;
import com.example.netflix_backend_springboot.model.Movie;
import com.example.netflix_backend_springboot.repository.MovieRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;


@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
   
    public Movie getMovieById(Long id) {
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            return movie.get();
        } else {
            throw new RuntimeException("Movie with id " + id + " not found");
        }
    }

    public List<Movie> getMoviesByCategory(String category) {
        return movieRepository.findByCategory(category);
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie updateMovie(Long id, Movie movie) {
        Optional<Movie> existingMovie = movieRepository.findById(id);
        if (existingMovie.isPresent()) {
            Movie updatedMovie = existingMovie.get();
            updatedMovie.setName(movie.getName()); 
            updatedMovie.setCategory(movie.getCategory());
            updatedMovie.setDescription(movie.getDescription());
            updatedMovie.setRating(movie.getRating());
            updatedMovie.setPosterUrl(movie.getPosterUrl());
            updatedMovie.setBackdropUrl(movie.getBackdropUrl());
            updatedMovie.setVideoUrl(movie.getVideoUrl());
            updatedMovie.setYear(movie.getYear());
            return movieRepository.save(updatedMovie);
        } else {
            throw new RuntimeException("Movie with id " + id + " not found");
        }
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}

