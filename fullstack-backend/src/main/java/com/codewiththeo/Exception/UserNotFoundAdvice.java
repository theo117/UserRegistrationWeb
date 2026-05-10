package com.codewiththeo.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.Instant;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class UserNotFoundAdvice {

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> exceptionHandler(UserNotFoundException exception) {
        Map<String, Object> errorMap = new LinkedHashMap<>();
        errorMap.put("timestamp", Instant.now().toString());
        errorMap.put("status", HttpStatus.NOT_FOUND.value());
        errorMap.put("error", "Not Found");
        errorMap.put("message", exception.getMessage());
        errorMap.put("userId", exception.getUserId());

        return errorMap;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> validationHandler(MethodArgumentNotValidException exception) {
        Map<String, String> fieldErrors = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error ->
                fieldErrors.put(error.getField(), error.getDefaultMessage())
        );

        Map<String, Object> errorMap = new LinkedHashMap<>();
        errorMap.put("timestamp", Instant.now().toString());
        errorMap.put("status", HttpStatus.BAD_REQUEST.value());
        errorMap.put("error", "Bad Request");
        errorMap.put("message", "Validation failed");
        errorMap.put("fields", fieldErrors);

        return errorMap;
    }
}
