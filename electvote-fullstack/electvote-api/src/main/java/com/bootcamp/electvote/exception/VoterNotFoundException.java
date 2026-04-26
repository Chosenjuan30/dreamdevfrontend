package com.bootcamp.electvote.exception;

public class VoterNotFoundException extends ElectionAppException {
    public VoterNotFoundException(String id) {
        super("Voter not found with id: " + id);
    }
}
