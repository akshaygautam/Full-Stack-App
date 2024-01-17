package com.akshaygautam.fullstackapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/akshaygautam")
public class BaseController {


    @GetMapping("/sayHello")
    public String sayHello() {
        return "Hello there ! this is Akshay Gautam's app";
    }

    @GetMapping("/sayMyName/{myName}")
    public String sayMyName(@PathVariable String myName) {
        return "Hello " + myName + " How are you, This is Akshay Gautam's App";
    }

    @GetMapping("/tableOf/{number}")
    public ResponseEntity<List<String>> multiplicationTable(@PathVariable Integer number) {
        List<String> table = new ArrayList<>();

        for (int i = 0; i <= 10; i++) {
            StringBuilder entry = new StringBuilder();
            entry.append(number).append(" x ").append(i).append(" = ").append(number * i);
            table.add(entry.toString());
        }

        return new ResponseEntity<>(table, HttpStatus.OK);
    }
}
