package com.akshaygautam.azureapps.azureapps.controller;

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
        return "Hello "+ myName + " How are you, This is Akshay Gautam's App";
    }
}
