
package com.example.netflix_backend_springboot.controller;

import com.example.netflix_backend_springboot.model.Movie;
import com.example.netflix_backend_springboot.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * The MovieController class handles HTTP requests related to movies.
 * It provides endpoints for retrieving, adding, updating, and deleting movies.
 */
@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getMoviesByCategory(@RequestParam(required = false) String category) {
        if (category != null) {
            return movieService.getMoviesByCategory(category);
        } else {
            return movieService.getAllMovies();
        }
    }

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable Long id) {
        return movieService.getMovieById(id);
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return movieService.addMovie(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        return movieService.updateMovie(id, movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
    }
}
