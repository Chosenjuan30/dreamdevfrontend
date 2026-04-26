package com.bootcamp.electvote.dto.response;

import com.bootcamp.electvote.model.ElectionStatus;
import lombok.*;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ResultResponse {
    private String electionId;
    private String electionTitle;
    private ElectionStatus status;
    private int totalVotes;
    private List<CandidateResult> results;

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CandidateResult {
        private String candidateId;
        private String candidateName;
        private String party;
        private int votes;
        private double percentage;
        private int rank;
    }
}
