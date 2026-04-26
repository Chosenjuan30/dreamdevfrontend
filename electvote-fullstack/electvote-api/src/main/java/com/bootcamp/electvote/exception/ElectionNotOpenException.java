package com.bootcamp.electvote.exception;

public class ElectionNotOpenException extends ElectionAppException {
    public ElectionNotOpenException(String id) {
        super("Election is not currently open for voting: " + id);
    }
}
