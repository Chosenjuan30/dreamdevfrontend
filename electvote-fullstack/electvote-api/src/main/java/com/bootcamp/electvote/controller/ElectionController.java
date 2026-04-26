package com.bootcamp.electvote.controller;

import com.bootcamp.electvote.dto.response.ApiResponse;
import com.bootcamp.electvote.dto.response.ElectionResponse;
import com.bootcamp.electvote.dto.response.ResultResponse;
import com.bootcamp.electvote.model.ElectionStatus;
import com.bootcamp.electvote.service.ElectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elections")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ElectionController {

    private final ElectionService electionService;

    /**
     * GET /api/elections
     * Get all elections (optionally filter by status)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<ElectionResponse>>> getAllElections(
            @RequestParam(required = false) ElectionStatus status) {
        if (status != null) {
            return ResponseEntity.ok(electionService.getElectionsByStatus(status));
        }
        return ResponseEntity.ok(electionService.getAllElections());
    }

    /**
     * GET /api/elections/{id}
     * Get a single election by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ElectionResponse>> getElectionById(@PathVariable String id) {
        return ResponseEntity.ok(electionService.getElectionById(id));
    }

    /**
     * GET /api/elections/{id}/results
     * Get live results for a specific election
     */
    @GetMapping("/{id}/results")
    public ResponseEntity<ApiResponse<ResultResponse>> getResults(@PathVariable String id) {
        return ResponseEntity.ok(electionService.getResults(id));
    }
}
