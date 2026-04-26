package com.bootcamp.electvote.serviceImpl;

import com.bootcamp.electvote.dto.request.AddCandidateRequest;
import com.bootcamp.electvote.dto.request.CreateElectionRequest;
import com.bootcamp.electvote.dto.response.ApiResponse;
import com.bootcamp.electvote.dto.response.ElectionResponse;
import com.bootcamp.electvote.dto.response.ResultResponse;
import com.bootcamp.electvote.exception.CandidateNotFoundException;
import com.bootcamp.electvote.exception.ElectionNotFoundException;
import com.bootcamp.electvote.model.Candidate;
import com.bootcamp.electvote.model.Election;
import com.bootcamp.electvote.model.ElectionStatus;
import com.bootcamp.electvote.repository.CandidateRepository;
import com.bootcamp.electvote.repository.ElectionRepository;
import com.bootcamp.electvote.repository.VoteRepository;
import com.bootcamp.electvote.service.ElectionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ElectionServiceImpl implements ElectionService {

    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;

    @Override
    public ApiResponse<ElectionResponse> createElection(CreateElectionRequest request) {
        log.info("Creating election: {}", request.getTitle());

        Election election = Election.builder()
                .title(request.getTitle())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(ElectionStatus.UPCOMING)
                .build();

        Election saved = electionRepository.save(election);
        return ApiResponse.success("Election created successfully", toResponse(saved));
    }

    @Override
    public ApiResponse<ElectionResponse> addCandidate(AddCandidateRequest request) {
        Election election = electionRepository.findById(request.getElectionId())
                .orElseThrow(() -> new ElectionNotFoundException("Election not found"));

        Candidate candidate = Candidate.builder()
                .name(request.getName())
                .party(request.getParty())
                .election(election)
                .build();

        candidateRepository.save(candidate);
        return ApiResponse.success("Candidate added successfully", toResponse(election));
    }

    @Override
    public ApiResponse<List<ElectionResponse>> getAllElections() {
        List<ElectionResponse> elections = electionRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ApiResponse.success("Elections retrieved successfully", elections);
    }

    @Override
    public ApiResponse<ElectionResponse> getElectionById(String id) {
        Election election = electionRepository.findById(id)
                .orElseThrow(() -> new ElectionNotFoundException("Election not found with id: " + id));
        return ApiResponse.success("Election retrieved successfully", toResponse(election));
    }

    @Override
    public ApiResponse<List<ElectionResponse>> getElectionsByStatus(ElectionStatus status) {
        List<ElectionResponse> elections = electionRepository.findByStatus(status)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ApiResponse.success("Elections retrieved", elections);
    }

    @Override
    public ApiResponse<ResultResponse> getResults(String electionId) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new ElectionNotFoundException("Election not found"));

        int totalVotes = voteRepository.countByElectionId(electionId);

        AtomicInteger rank = new AtomicInteger(1);
        List<ResultResponse.CandidateResult> results = election.getCandidates()
                .stream()
                .map(c -> {
                    int votes = voteRepository.countByCandidateId(c.getId());
                    double pct = totalVotes > 0 ? (votes * 100.0 / totalVotes) : 0;
                    return ResultResponse.CandidateResult.builder()
                            .candidateId(c.getId())
                            .candidateName(c.getName())
                            .party(c.getParty())
                            .votes(votes)
                            .percentage(Math.round(pct * 10.0) / 10.0)
                            .build();
                })
                .sorted(Comparator.comparingInt(ResultResponse.CandidateResult::getVotes).reversed())
                .peek(r -> r.setRank(rank.getAndIncrement()))
                .collect(Collectors.toList());

        ResultResponse response = ResultResponse.builder()
                .electionId(election.getId())
                .electionTitle(election.getTitle())
                .status(election.getStatus())
                .totalVotes(totalVotes)
                .results(results)
                .build();

        return ApiResponse.success("Results retrieved successfully", response);
    }

    // Auto-update election statuses every minute
    @Scheduled(fixedRate = 60000)
    public void syncElectionStatuses() {
        LocalDateTime now = LocalDateTime.now();
        List<Election> all = electionRepository.findAll();
        all.forEach(e -> {
            ElectionStatus newStatus;
            if (now.isBefore(e.getStartDate())) newStatus = ElectionStatus.UPCOMING;
            else if (now.isAfter(e.getEndDate()))  newStatus = ElectionStatus.CLOSED;
            else                                    newStatus = ElectionStatus.OPEN;
            if (e.getStatus() != newStatus) {
                e.setStatus(newStatus);
                electionRepository.save(e);
                log.info("Election '{}' status updated to {}", e.getTitle(), newStatus);
            }
        });
    }

    // ── Mapper ────────────────────────────────────────────────────────────────
    private ElectionResponse toResponse(Election e) {
        List<ElectionResponse.CandidateResponse> candidates = e.getCandidates() == null
                ? List.of()
                : e.getCandidates().stream().map(c -> ElectionResponse.CandidateResponse.builder()
                        .id(c.getId())
                        .name(c.getName())
                        .party(c.getParty())
                        .voteCount(voteRepository.countByCandidateId(c.getId()))
                        .build())
                    .collect(Collectors.toList());

        int totalVotes = candidates.stream().mapToInt(ElectionResponse.CandidateResponse::getVoteCount).sum();

        return ElectionResponse.builder()
                .id(e.getId())
                .title(e.getTitle())
                .status(e.getStatus())
                .startDate(e.getStartDate())
                .endDate(e.getEndDate())
                .candidates(candidates)
                .totalVotes(totalVotes)
                .build();
    }
}
