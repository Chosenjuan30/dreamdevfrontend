package com.bootcamp.electvote.controller;

import com.bootcamp.electvote.dto.request.AddCandidateRequest;
import com.bootcamp.electvote.dto.request.CreateElectionRequest;
import com.bootcamp.electvote.dto.response.ApiResponse;
import com.bootcamp.electvote.dto.response.ElectionResponse;
import com.bootcamp.electvote.service.ElectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ElectionService electionService;

    /**
     * POST /api/admin/elections
     * Create a new election (ADMIN only)
     */
    @PostMapping("/elections")
    public ResponseEntity<ApiResponse<ElectionResponse>> createElection(
            @Valid @RequestBody CreateElectionRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(electionService.createElection(request));
    }

    /**
     * POST /api/admin/candidates
     * Add a candidate to an election (ADMIN only)
     */
    @PostMapping("/candidates")
    public ResponseEntity<ApiResponse<ElectionResponse>> addCandidate(
            @Valid @RequestBody AddCandidateRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(electionService.addCandidate(request));
    }
}
