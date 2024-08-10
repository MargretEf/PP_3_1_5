package ru.kata.spring.boot_security.demo.util;

public class UserNotEditEsception  extends RuntimeException{
    private String message;

    public UserNotEditEsception(String message) {
        this.message = message;
    }
}
