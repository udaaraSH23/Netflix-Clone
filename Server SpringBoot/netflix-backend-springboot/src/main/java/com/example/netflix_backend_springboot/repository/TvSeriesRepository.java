package com.example.netflix_backend_springboot.repository;
import com.example.netflix_backend_springboot.model.TvSeries;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;



public interface TvSeriesRepository extends JpaRepository<TvSeries, Long> {
    List<TvSeries> findByCategory(String category);
}
