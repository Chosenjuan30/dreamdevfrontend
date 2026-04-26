package com.bootcamp.electvote.service;

import com.bootcamp.electvote.dto.request.AddCandidateRequest;
import com.bootcamp.electvote.dto.request.CreateElectionRequest;
import com.bootcamp.electvote.dto.response.ElectionResponse;
import com.bootcamp.electvote.dto.response.ResultResponse;

import java.util.List;

public interface ElectionService {
    List<ElectionResponse> getAllElections();
    ElectionResponse getElectionById(String id);
    ElectionResponse createElection(CreateElectionRequest request);
    ElectionResponse addCandidate(AddCandidateRequest request);
    ElectionResponse openElection(String id);
    ElectionResponse closeElection(String id);
    ResultResponse getResults(String electionId);
}
