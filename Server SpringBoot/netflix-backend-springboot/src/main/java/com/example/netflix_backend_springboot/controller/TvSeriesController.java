package com.example.netflix_backend_springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.netflix_backend_springboot.service.TvSeriesService;
import com.example.netflix_backend_springboot.model.TvSeries;

import java.util.List;

@RestController
@RequestMapping("/tvseries")
public class TvSeriesController {

    private final TvSeriesService tvSeriesService;

    @Autowired
    public TvSeriesController(TvSeriesService tvSeriesService) {
        this.tvSeriesService = tvSeriesService;
    }

    @GetMapping
    public List<TvSeries> getTvSeriesByCategory(@RequestParam(required = false) String category) {
        if (category != null) {
            return tvSeriesService.getTvSeriesByCategory(category);
        } else {
            return tvSeriesService.getAllTvSeries();
        }
    }

    @GetMapping("/{id}")
    public TvSeries getTvSeries(@PathVariable Long id) {
        return tvSeriesService.getTvSeriesById(id);
    }

    @PostMapping
    public TvSeries addTvSeries(@RequestBody TvSeries tvSeries) {
        return tvSeriesService.addTvSeries(tvSeries);
    }

    @PutMapping("/{id}")
    public TvSeries updateTvSeries(@PathVariable Long id, @RequestBody TvSeries tvSeries) {
        return tvSeriesService.updateTvSeries(id, tvSeries);
    }

    @DeleteMapping("/{id}")
    public void deleteTvSeries(@PathVariable Long id) {
        tvSeriesService.deleteTvSeries(id);
    }
}
