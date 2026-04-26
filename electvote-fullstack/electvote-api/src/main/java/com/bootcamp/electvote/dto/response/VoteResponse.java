package com.bootcamp.electvote.dto.response;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class VoteResponse {
    private String voteId;
    private String voterId;
    private String electionId;
    private String electionTitle;
    private String candidateId;
    private String candidateName;
    private LocalDateTime votedAt;
    private String message;
}
