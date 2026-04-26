package com.bootcamp.electvote.exception;

public class InvalidLoginDetailsException extends ElectionAppException {
    public InvalidLoginDetailsException() {
        super("Invalid email or password.");
    }
}
