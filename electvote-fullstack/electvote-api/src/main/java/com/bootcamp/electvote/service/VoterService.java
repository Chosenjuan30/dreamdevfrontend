package com.bootcamp.electvote.service;

import com.bootcamp.electvote.dto.request.LoginRequest;
import com.bootcamp.electvote.dto.request.VoterRegistrationRequest;
import com.bootcamp.electvote.dto.response.LoginResponse;
import com.bootcamp.electvote.dto.response.VoterRegistrationResponse;

public interface VoterService {
    VoterRegistrationResponse register(VoterRegistrationRequest request);
    LoginResponse login(LoginRequest request);
}
