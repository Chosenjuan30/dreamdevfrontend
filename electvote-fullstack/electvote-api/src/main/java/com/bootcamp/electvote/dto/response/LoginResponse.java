package com.bootcamp.electvote.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// ─── LoginResponse ────────────────────────────────────────────────────────────
@Data @Builder @NoArgsConstructor @AllArgsConstructor
class LoginResponse {
    private String token;
    private String voterId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
}
