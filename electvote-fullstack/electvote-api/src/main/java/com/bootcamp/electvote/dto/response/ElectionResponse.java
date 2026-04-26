package com.bootcamp.electvote.dto.response;

import com.bootcamp.electvote.model.ElectionStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ElectionResponse {
    private String id;
    private String title;
    private ElectionStatus status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<CandidateResponse> candidates;
    private int totalVotes;

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class CandidateResponse {
        private String id;
        private String name;
        private String party;
        private int voteCount;
    }
}
