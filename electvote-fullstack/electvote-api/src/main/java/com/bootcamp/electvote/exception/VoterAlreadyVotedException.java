package com.bootcamp.electvote.exception;

public class VoterAlreadyVotedException extends ElectionAppException {
    public VoterAlreadyVotedException() {
        super("You have already cast your vote in this election.");
    }
}
