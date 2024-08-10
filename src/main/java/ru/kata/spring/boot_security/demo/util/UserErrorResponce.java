package ru.kata.spring.boot_security.demo.util;

public class UserErrorResponce {
    private String massege;
    public UserErrorResponce(String massege) {
        this.massege = massege;
    }

    public String getMassege() {
        return massege;
    }

    public void setMassege(String massege) {
        this.massege = massege;
    }
}
