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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        List<Person> personList = new ArrayList<>();
        personList.add(new Person(null, "Jorge", 46546546542L, false, "Rua Joaquim Anacleto 1-20", 17047220, "Bauru", false, ""));
        personList.add(new Person(null, "Cleber", 46546546555L, false, "Rua Anacleto 1-20", 17047200, "Agudos", true, "CRM/SP 123456"));
        personList.add(new Person(null, "Cleber", 46546546520L, false, "Rua Anacleto 1-20", 17047200, "São Paulo", true, "CRM/SP 123456"));
        personList.add(new Person(null, "Cleber", 46546546522L, false, "Rua Joaquim Anacleto", 17047200, "Ponta Grossa", true, "CRM/SP 123456"));
        personList.add(new Person(null, "Cleber", 46546546513L, false, "Rua Joaquim Anacleto 1899", 17047200, "", true, "CRM/SP 123456"));

        for (Person person: personList)
        {
            System.out.println("Person: " + person);
            personRepository.save(person);
        }

        List<Event> events = new ArrayList<>();
        Event aux = null;
        try
        {
            aux = createEvent(personList.get(0), personList.get(1), scheduleTimes.nine_ten, LocalDate.now());
            if(aux != null)
                events.add(aux);
            else
                System.out.println("Não salvou o e1");

            aux = createEvent(personList.get(1), personList.get(0), scheduleTimes.nine_ten, LocalDate.now().plusDays(1));
            if(aux != null)
                events.add(aux);
            else
                System.out.println("Não salvou o e2");

            aux = createEvent(1L, 3L, scheduleTimes.nine_ten, LocalDate.now().plusDays(1));
            if(aux != null)
                events.add(aux);
            else
                System.out.println("Não salvou o e3");

            //Event e3 = createEvent(p2, p1, scheduleTimes.nine_ten, LocalDate.now().plusDays(1));

            for (Event event: events)
            {
                System.out.println("Event: " + event);
                eventRepository.save(event);
            }
        }
        catch (Exception ex)
        {
            System.out.println("ERRRO: "+ex.getMessage());
        }

    }

    public Event createEvent(Person p1, Person p2, scheduleTimes time, LocalDate date)
    {
        try
        {
            return new Event(p1, p2, time, date);
        }
        catch (Exception ex)
        {
            System.out.println("ERRO: "+ex.getMessage());
            return null;
        }
    }

    public Event createEvent(Long p1, Long p2, scheduleTimes time, LocalDate date)
    {
        try
        {
            return new Event(p1, p2, time, date);
        }
        catch (Exception ex)
        {
            System.out.println("ERRO: "+ex.getMessage());
            return null;
        }
    }
}
