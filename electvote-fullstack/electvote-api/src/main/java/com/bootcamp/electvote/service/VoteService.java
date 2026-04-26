package com.bootcamp.electvote.service;

import com.bootcamp.electvote.dto.request.VoteRequest;
import com.bootcamp.electvote.dto.response.VoteResponse;

public interface VoteService {
    VoteResponse castVote(VoteRequest request, String voterEmail);
    boolean hasVoted(String voterId, String electionId);
}
