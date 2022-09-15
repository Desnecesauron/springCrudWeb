package com.mstech.dev.examples.crud.configs;

import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner
{

    @Autowired
    private PersonRepository personRepository;

    @Override
    public void run(String... args) throws Exception {
        Person p1= new Person(null, "Jorge", 3, 2500.52);
        Person p2= new Person(null, "Cleber", 6, 600.37);

        personRepository.saveAll(Arrays.asList(p1, p2));
    }
}
