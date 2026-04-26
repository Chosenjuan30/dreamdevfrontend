package com.bootcamp.electvote.serviceImpl;

import com.bootcamp.electvote.dto.request.VoteRequest;
import com.bootcamp.electvote.dto.response.ApiResponse;
import com.bootcamp.electvote.dto.response.VoteResponse;
import com.bootcamp.electvote.exception.CandidateNotFoundException;
import com.bootcamp.electvote.exception.ElectionNotFoundException;
import com.bootcamp.electvote.exception.ElectionNotOpenException;
import com.bootcamp.electvote.exception.VoterAlreadyVotedException;
import com.bootcamp.electvote.exception.VoterNotFoundException;
import com.bootcamp.electvote.model.*;
import com.bootcamp.electvote.repository.CandidateRepository;
import com.bootcamp.electvote.repository.ElectionRepository;
import com.bootcamp.electvote.repository.VoteRepository;
import com.bootcamp.electvote.repository.VoterRepository;
import com.bootcamp.electvote.service.VoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final VoterRepository voterRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;

    @Override
    @Transactional
    public ApiResponse<VoteResponse> castVote(VoteRequest request, String voterEmail) {
        log.info("Voter {} casting vote in election {}", voterEmail, request.getElectionId());

        // 1. Load voter
        Voter voter = voterRepository.findByEmail(voterEmail)
                .orElseThrow(() -> new VoterNotFoundException("Voter not found"));

        // 2. Load election
        Election election = electionRepository.findById(request.getElectionId())
                .orElseThrow(() -> new ElectionNotFoundException("Election not found"));

        // 3. Check election is open
        if (election.getStatus() != ElectionStatus.OPEN) {
            throw new ElectionNotOpenException("Election is not currently open for voting");
        }

        // 4. Check voter hasn't already voted
        if (voteRepository.existsByVoterIdAndElectionId(voter.getId(), election.getId())) {
            throw new VoterAlreadyVotedException("You have already voted in this election");
        }

        // 5. Load candidate and verify it belongs to this election
        Candidate candidate = candidateRepository.findById(request.getCandidateId())
                .orElseThrow(() -> new CandidateNotFoundException("Candidate not found"));

        if (!candidate.getElection().getId().equals(election.getId())) {
            throw new CandidateNotFoundException("Candidate does not belong to this election");
        }

        // 6. Record the vote
        Vote vote = Vote.builder()
                .voter(voter)
                .election(election)
                .candidate(candidate)
                .votedAt(LocalDateTime.now())
                .build();

        Vote saved = voteRepository.save(vote);
        log.info("Vote recorded successfully: {}", saved.getId());

        VoteResponse response = VoteResponse.builder()
                .voteId(saved.getId())
                .voterId(voter.getId())
                .electionId(election.getId())
                .electionTitle(election.getTitle())
                .candidateId(candidate.getId())
                .candidateName(candidate.getName())
                .votedAt(saved.getVotedAt())
                .message("Your vote has been recorded. Thank you for participating!")
                .build();

        return ApiResponse.success("Vote cast successfully", response);
    }

    @Override
    public boolean hasVoted(String voterId, String electionId) {
        return voteRepository.existsByVoterIdAndElectionId(voterId, electionId);
    }
}
