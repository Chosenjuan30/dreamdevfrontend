package com.bootcamp.electvote.dto.response;

import com.bootcamp.electvote.model.ElectionStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

// ─── VoterRegistrationResponse ───────────────────────────────────────────────
@Data @Builder @NoArgsConstructor @AllArgsConstructor
class VoterRegistrationResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String message;
}
