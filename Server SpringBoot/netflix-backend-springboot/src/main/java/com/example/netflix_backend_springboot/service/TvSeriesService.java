package com.example.netflix_backend_springboot.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.netflix_backend_springboot.repository.TvSeriesRepository;
import com.example.netflix_backend_springboot.model.TvSeries;

import java.util.List;
import java.util.Optional;

@Service
public class TvSeriesService {

    private final TvSeriesRepository tvSeriesRepository;

    @Autowired
    public TvSeriesService(TvSeriesRepository tvSeriesRepository) {
        this.tvSeriesRepository = tvSeriesRepository;
    }

    public List<TvSeries> getAllTvSeries() {
        return tvSeriesRepository.findAll();
    }

    public TvSeries getTvSeriesById(Long id) {
        Optional<TvSeries> tvSeries = tvSeriesRepository.findById(id);
        if (tvSeries.isPresent()) {
            return tvSeries.get();
        } else {
            throw new RuntimeException("TV Series with id " + id + " not found");
        }
    }

    public List<TvSeries> getTvSeriesByCategory(String category) {
        return tvSeriesRepository.findByCategory(category);
    }

    public TvSeries addTvSeries(TvSeries tvSeries) {
        return tvSeriesRepository.save(tvSeries);
    }

    public TvSeries updateTvSeries(Long id, TvSeries tvSeries) {
        Optional<TvSeries> existingTvSeries = tvSeriesRepository.findById(id);
        if (existingTvSeries.isPresent()) {
            TvSeries updatedTvSeries = existingTvSeries.get();
            updatedTvSeries.setName(tvSeries.getName());
            updatedTvSeries.setCategory(tvSeries.getCategory());
            updatedTvSeries.setDescription(tvSeries.getDescription());
            updatedTvSeries.setRating(tvSeries.getRating());
            updatedTvSeries.setPosterUrl(tvSeries.getPosterUrl());
            updatedTvSeries.setBackdropUrl(tvSeries.getBackdropUrl());
            updatedTvSeries.setVideoUrl(tvSeries.getVideoUrl());
            updatedTvSeries.setYear(tvSeries.getYear());
            return tvSeriesRepository.save(updatedTvSeries);
        } else {
            throw new RuntimeException("TV Series with id " + id + " not found");
        }
    }

    public void deleteTvSeries(Long id) {
        tvSeriesRepository.deleteById(id);
    }
}
