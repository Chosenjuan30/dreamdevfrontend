package com.bootcamp.electvote.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddCandidateRequest {

    @NotBlank(message = "Candidate name is required")
    private String name;

    @NotBlank(message = "Party name is required")
    private String party;

    @NotBlank(message = "Election ID is required")
    private String electionId;
}
