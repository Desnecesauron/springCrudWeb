package com.mstech.dev.examples.crud.controllers;

import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping(value = "/listPersons")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping
    public ResponseEntity<List<Person>> listPersons()
    {
        List<Person> personList = personService.allPersons();
        return ResponseEntity.ok().body(personList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Person> findPerson(@PathVariable Long id)
    {
        Person person= personService.findPerson(id);
        return ResponseEntity.ok().body(person);
    }

}
