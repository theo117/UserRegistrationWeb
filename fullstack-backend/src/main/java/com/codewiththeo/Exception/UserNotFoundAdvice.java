package com.codewiththeo.Exception;

import com.codewiththeo.Model.User;
import com.codewiththeo.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@ControllerAdvice
public class UserNotFoundAdvice {

    private final UserRepository userRepository;

    // Constructor injection
    public UserNotFoundAdvice(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleNotFound(UserNotFoundException ex) {
        Optional<User> user = userRepository.findById(ex.getUserId());
        // handle exception
        return null;
    }

    @ResponseBody

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> exceptionHandler(UserNotFoundException exception){
        Map <String, String> errorMap = new HashMap<>();
        errorMap.put("Error Message", exception.getMessage());

        return errorMap;
    }



}






