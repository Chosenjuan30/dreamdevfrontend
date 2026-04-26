package com.bootcamp.electvote.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// ─── Base exception ───────────────────────────────────────────────────────────
public class ElectionAppException extends RuntimeException {
    public ElectionAppException(String message) {
        super(message);
    }
}
