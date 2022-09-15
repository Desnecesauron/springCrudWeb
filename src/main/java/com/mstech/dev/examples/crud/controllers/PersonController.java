package com.mstech.dev.examples.crud.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/listPersons")
public class PersonController {

    @GetMapping
    public ResponseEntity listPersons()
    {
        return ResponseEntity.ok().body("Tamo Junto");
    }

}
