package ru.kata.spring.boot_security.demo.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserGlobalExceptionHandler {


    @ExceptionHandler
    private ResponseEntity<UserErrorResponce> handleException(UserNotFoundException e) {
        UserErrorResponce error = new UserErrorResponce("User not found");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponce> handleException(UserNotCreatedException e) {
        UserErrorResponce error = new UserErrorResponce(e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler
    private ResponseEntity<UserErrorResponce> handleException(UserNotEditEsception e) {
        UserErrorResponce error = new UserErrorResponce("User not edit");
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponce> handleException(Exception e) {
        UserErrorResponce error = new UserErrorResponce(e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
