package com.bootcamp.electvote.exception;

public class VoterAlreadyExistsException extends ElectionAppException {
    public VoterAlreadyExistsException(String email) {
        super("An account already exists with email: " + email);
    }
}
