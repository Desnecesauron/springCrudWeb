package com.mstech.dev.examples.crud.controllers;

import com.mstech.dev.examples.crud.entities.Event;
import com.mstech.dev.examples.crud.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        System.out.println("entrou");
        System.out.println(""+newEvent.toString());
        boolean success = eventService.saveEvent(newEvent);
        if(success)
            return ResponseEntity.ok().body(newEvent);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
