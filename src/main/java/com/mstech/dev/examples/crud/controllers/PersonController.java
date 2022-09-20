package com.mstech.dev.examples.crud.controllers;

import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return ResponseEntity.ok().body( person);
    }

    public Person returnPerson(Long id)
    {
        return personService.findPerson(id);
    }

    @PostMapping(value = "/ins",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Person> insertPerson(@RequestBody Person newPerson)
    {
        boolean success = personService.savePerson(newPerson);
        if(success)
            return ResponseEntity.ok().body(newPerson);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
