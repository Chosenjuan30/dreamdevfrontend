package com.bootcamp.electvote.serviceImpl;

import com.bootcamp.electvote.dto.request.LoginRequest;
import com.bootcamp.electvote.dto.request.VoterRegistrationRequest;
import com.bootcamp.electvote.dto.response.ApiResponse;
import com.bootcamp.electvote.dto.response.LoginResponse;
import com.bootcamp.electvote.dto.response.VoterRegistrationResponse;
import com.bootcamp.electvote.exception.InvalidLoginDetailsException;
import com.bootcamp.electvote.exception.PasswordMismatchException;
import com.bootcamp.electvote.exception.VoterAlreadyExistsException;
import com.bootcamp.electvote.exception.VoterNotFoundException;
import com.bootcamp.electvote.model.Voter;
import com.bootcamp.electvote.repository.VoterRepository;
import com.bootcamp.electvote.security.JwtService;
import com.bootcamp.electvote.service.VoterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VoterServiceImpl implements VoterService {

    private final VoterRepository voterRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public ApiResponse<VoterRegistrationResponse> register(VoterRegistrationRequest request) {
        log.info("Registering voter with email: {}", request.getEmail());

        if (voterRepository.existsByEmail(request.getEmail())) {
            throw new VoterAlreadyExistsException("A voter with this email already exists");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new PasswordMismatchException("Passwords do not match");
        }

        Voter voter = Voter.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Voter.Role.VOTER)
                .build();

        Voter saved = voterRepository.save(voter);
        log.info("Voter registered successfully with id: {}", saved.getId());

        VoterRegistrationResponse response = VoterRegistrationResponse.builder()
                .id(saved.getId())
                .firstName(saved.getFirstName())
                .lastName(saved.getLastName())
                .email(saved.getEmail())
                .message("Registration successful. You can now log in.")
                .build();

        return ApiResponse.success("Voter registered successfully", response);
    }

    @Override
    public ApiResponse<LoginResponse> login(LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());

        Voter voter = voterRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidLoginDetailsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), voter.getPassword())) {
            throw new InvalidLoginDetailsException("Invalid email or password");
        }

        String token = jwtService.generateToken(voter.getEmail(), voter.getRole().name());

        LoginResponse response = LoginResponse.builder()
                .token(token)
                .voterId(voter.getId())
                .firstName(voter.getFirstName())
                .lastName(voter.getLastName())
                .email(voter.getEmail())
                .role(voter.getRole().name())
                .build();

        log.info("Login successful for voter: {}", voter.getId());
        return ApiResponse.success("Login successful", response);
    }

    @Override
    public Voter getVoterByEmail(String email) {
        return voterRepository.findByEmail(email)
                .orElseThrow(() -> new VoterNotFoundException("Voter not found with email: " + email));
    }
}
