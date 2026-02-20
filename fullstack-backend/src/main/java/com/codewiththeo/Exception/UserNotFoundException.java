package com.codewiththeo.Exception;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(Long id){
        super ("Could not find the user with id " + id);

    }

    public Long getUserId() {
        return 0L;
    }
}
