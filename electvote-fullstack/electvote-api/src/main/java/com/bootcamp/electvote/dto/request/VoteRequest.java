package com.bootcamp.electvote.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VoteRequest {
    @NotBlank(message = "Election ID is required")
    private String electionId;

    @NotBlank(message = "Candidate ID is required")
    private String candidateId;
}
