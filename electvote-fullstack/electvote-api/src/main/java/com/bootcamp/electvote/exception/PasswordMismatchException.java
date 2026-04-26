package com.bootcamp.electvote.exception;

public class PasswordMismatchException extends ElectionAppException {
    public PasswordMismatchException() {
        super("Passwords do not match.");
    }
}
