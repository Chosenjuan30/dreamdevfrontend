// ─── REQUEST DTOs ────────────────────────────────────────────────────────────

package com.bootcamp.electvote.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// LoginRequest.java
@Data
class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    public String email;

    @NotBlank(message = "Password is required")
    public String password;
}
