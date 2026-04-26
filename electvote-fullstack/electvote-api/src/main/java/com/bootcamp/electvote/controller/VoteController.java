package com.bootcamp.electvote.controller;

import com.bootcamp.electvote.dto.request.VoteRequest;
import com.bootcamp.electvote.dto.response.ApiResponse;
import com.bootcamp.electvote.dto.response.VoteResponse;
import com.bootcamp.electvote.service.VoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vote")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VoteController {

    private final VoteService voteService;

    /**
     * POST /api/vote
     * Cast a vote — requires JWT auth
     */
    @PostMapping
    public ResponseEntity<ApiResponse<VoteResponse>> castVote(
            @Valid @RequestBody VoteRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(voteService.castVote(request, userDetails.getUsername()));
    }

    /**
     * GET /api/vote/check?electionId=xxx
     * Check if authenticated voter has already voted in an election
     */
    @GetMapping("/check")
    public ResponseEntity<ApiResponse<Boolean>> hasVoted(
            @RequestParam String electionId,
            @AuthenticationPrincipal UserDetails userDetails) {
        // We derive voterId from the authenticated user's email
        boolean voted = voteService.hasVoted(userDetails.getUsername(), electionId);
        return ResponseEntity.ok(ApiResponse.success("Vote status checked", voted));
    }
}
