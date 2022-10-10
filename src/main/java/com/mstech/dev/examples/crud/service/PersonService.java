package com.mstech.dev.examples.crud.service;

import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.exceptions.DataNotFoundException;
import com.mstech.dev.examples.crud.exceptions.DataNotPossibleException;
import com.mstech.dev.examples.crud.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Optional<Person> obj = personRepository.findById(id);
        return obj.orElseThrow(() -> new DataNotFoundException(id));
    }

    public Person findByCPF(Long CPF)
    {
        Person obj = personRepository.findByCpf(CPF);
        return obj;
    }

 /*   public Person findPersonCPF(Long cpf)
    {
        Optional<Person> obj = personRepository.find(id);
        return obj.orElseThrow(() -> new DataNotFoundException(id));
    }*/

    public boolean savePerson(Person person)
    {
        try
        {
            Person obj = personRepository.save(person);
        }
        catch (Exception ex)
        {
            throw new DataNotPossibleException("Service error, exception: " + ex.getMessage());
        }
        return true;
    }
}
