package com.bootcamp.electvote.repository;

import com.bootcamp.electvote.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {
    List<Candidate> findByElectionId(String electionId);
    boolean existsByNameAndElectionId(String name, String electionId);
}
