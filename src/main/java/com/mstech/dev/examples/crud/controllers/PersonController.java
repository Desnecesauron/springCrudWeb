package com.mstech.dev.examples.crud.controllers;

import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.exceptions.DataNotFoundException;
import com.mstech.dev.examples.crud.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 360000)
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
    
    @GetMapping(value = "/cpf/{cpfNumber}")
    public ResponseEntity<Person> findPersonCPF(@PathVariable Long cpfNumber)
    {
        Person person= personService.findByCPF(cpfNumber);
        if(person!=null)
            return ResponseEntity.ok().body(person);
        throw new DataNotFoundException(cpfNumber);
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
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
