package com.mstech.dev.examples.crud.configs;

import com.mstech.dev.examples.crud.entities.Event;
import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.entities.enums.scheduleTimes;
import com.mstech.dev.examples.crud.repositories.EventRepository;
import com.mstech.dev.examples.crud.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;
import java.util.Arrays;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner
{

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public void run(String... args) throws Exception {
        Person p1= new Person(null, "Jorge", 46546546542L, false, "Rua Joaquim Anacleto 1-20", 17047220, "Bauru", false, "");
        Person p2= new Person(null, "Cleber", 46546546555L, false, "Rua Joaquim Anacleto 1-20", 17047200, "Agudos", true, "CRM/SP 123456");

        Event e1 = new Event(p1, p2, scheduleTimes.nine_ten, LocalDate.now());

        personRepository.saveAll(Arrays.asList(p1, p2));
        eventRepository.saveAll(Arrays.asList(e1));
    }
}
