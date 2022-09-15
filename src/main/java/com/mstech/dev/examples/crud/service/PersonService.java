package com.mstech.dev.examples.crud.service;

import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService
{
    @Autowired
    private PersonRepository personRepository;

    public List<Person> allPersons()
    {
        return personRepository.findAll();
    }

    public Person findPerson(Long id)
    {
        return personRepository.findById(id).get();
    }
}
