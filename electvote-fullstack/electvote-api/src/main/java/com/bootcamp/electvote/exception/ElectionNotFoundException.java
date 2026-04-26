package com.bootcamp.electvote.exception;

public class ElectionNotFoundException extends ElectionAppException {
    public ElectionNotFoundException(String id) {
        super("Election not found with id: " + id);
    }
}
