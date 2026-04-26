package com.bootcamp.electvote.repository;

import com.bootcamp.electvote.model.Election;
import com.bootcamp.electvote.model.ElectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ElectionRepository extends JpaRepository<Election, String> {

    List<Election> findByStatus(ElectionStatus status);

    List<Election> findAllByOrderByStartDateDesc();

    @Query("SELECT e FROM Election e WHERE e.status = 'OPEN' AND e.endDate < :now")
    List<Election> findExpiredOpenElections(LocalDateTime now);

    @Query("SELECT e FROM Election e WHERE e.status = 'UPCOMING' AND e.startDate <= :now")
    List<Election> findElectionsDueToOpen(LocalDateTime now);
}
