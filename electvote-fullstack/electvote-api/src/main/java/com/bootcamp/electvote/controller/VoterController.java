package com.bootcamp.electvote.controller;

import com.bootcamp.electvote.dto.request.LoginRequest;
import com.bootcamp.electvote.dto.request.VoterRegistrationRequest;
import com.bootcamp.electvote.dto.response.ApiResponse;
import com.bootcamp.electvote.dto.response.LoginResponse;
import com.bootcamp.electvote.dto.response.VoterRegistrationResponse;
import com.bootcamp.electvote.service.VoterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class VoterController {

    private final VoterService voterService;

    /**
     * POST /api/auth/register
     * Register a new voter account
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<VoterRegistrationResponse>> register(
            @Valid @RequestBody VoterRegistrationRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(voterService.register(request));
    }

    /**
     * POST /api/auth/login
     * Authenticate voter and return JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(voterService.login(request));
    }
}
