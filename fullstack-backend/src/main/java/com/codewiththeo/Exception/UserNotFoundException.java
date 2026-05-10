package com.codewiththeo.Exception;

public class UserNotFoundException extends RuntimeException {

    private final Long userId;

    public UserNotFoundException(Long id) {
        super("Could not find the user with id " + id);
        this.userId = id;
    }

    public Long getUserId() {
        return userId;
    }
}
