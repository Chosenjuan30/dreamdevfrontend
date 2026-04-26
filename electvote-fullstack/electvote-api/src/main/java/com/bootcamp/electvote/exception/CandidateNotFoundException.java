package com.bootcamp.electvote.exception;

public class CandidateNotFoundException extends ElectionAppException {
    public CandidateNotFoundException(String id) {
        super("Candidate not found with id: " + id);
    }
}
