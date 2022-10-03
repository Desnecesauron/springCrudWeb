package com.mstech.dev.examples.crud.controllers;

import com.mstech.dev.examples.crud.entities.Event;
import com.mstech.dev.examples.crud.entities.Person;
import com.mstech.dev.examples.crud.exceptions.DataNotPossibleException;
import com.mstech.dev.examples.crud.repositories.PersonRepository;
import com.mstech.dev.examples.crud.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 360000)
@RestController
@RequestMapping(value = "/listEvents")
public class EventController
{

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<Event>> listEvents()
    {
        List<Event> eventList = eventService.allEvents();
        return ResponseEntity.ok().body(eventList);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Event> findEvent(@PathVariable Long id)
    {
        Event event= eventService.findEvent(id);
        return ResponseEntity.ok().body( event);
    }

    @PostMapping(value = "/ins",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> insertEvent(@RequestBody Event newEvent)
    {
        if(newEvent.getMedic().getNome()==null  || newEvent.getMedic().getCpf()==0 || newEvent.getMedic().getEndereco()==null  || newEvent.getMedic().getCep()==0 || newEvent.getMedic().getCidade()==null || newEvent.getMedic().getCrm()==null)
        {
            throw new DataNotPossibleException("All data from medic is necessary!");
        }
        if(newEvent.getPatient().getNome()==null  || newEvent.getPatient().getCpf()==0 || newEvent.getPatient().getEndereco()==null  || newEvent.getPatient().getCep()==0 || newEvent.getPatient().getCidade()==null || newEvent.getPatient().getCrm()==null)
        {
            throw new DataNotPossibleException("All data from patient is necessary!");
        }
        System.out.println(newEvent);

        //do the checks for cannot save any event with "blank vars"
        if(newEvent.getMedic().getId().equals(newEvent.getPatient().getId()))
            throw new DataNotPossibleException("An medical appointment cannot be made by you and yourself!");
        if(!(newEvent.getMedic().isMedico()))
            throw new DataNotPossibleException("An medical appointment cannot be made by a patient");

        System.out.println("entrou");
        System.out.println(""+newEvent.toString());
        boolean success = eventService.saveEvent(newEvent);
        System.out.println("Saiu");
        if(success)
            return ResponseEntity.ok().body(newEvent);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
