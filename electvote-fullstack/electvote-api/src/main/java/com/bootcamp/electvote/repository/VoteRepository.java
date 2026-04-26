package com.bootcamp.electvote.repository;

import com.bootcamp.electvote.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, String> {

    boolean existsByVoterIdAndElectionId(String voterId, String electionId);

    Optional<Vote> findByVoterIdAndElectionId(String voterId, String electionId);

    List<Vote> findByElectionId(String electionId);

    @Query("SELECT v.candidate.id, COUNT(v) FROM Vote v WHERE v.election.id = :electionId GROUP BY v.candidate.id")
    List<Object[]> countVotesByCandidate(String electionId);

    long countByElectionId(String electionId);
}
