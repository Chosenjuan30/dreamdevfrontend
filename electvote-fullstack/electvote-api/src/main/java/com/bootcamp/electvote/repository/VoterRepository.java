package com.bootcamp.electvote.repository;

import com.bootcamp.electvote.model.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoterRepository extends JpaRepository<Voter, String> {
    Optional<Voter> findByEmail(String email);
    boolean existsByEmail(String email);
}
