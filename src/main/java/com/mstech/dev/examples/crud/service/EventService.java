package com.mstech.dev.examples.crud.service;

import com.mstech.dev.examples.crud.entities.Event;
import com.mstech.dev.examples.crud.exceptions.DataNotFoundException;
import com.mstech.dev.examples.crud.exceptions.DataNotPossibleException;
import com.mstech.dev.examples.crud.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService
{
    
    @Autowired
    private EventRepository eventRepository;
    
    public List<Event> allEvents()
    {
        return eventRepository.findAll();
    }

    public Event findEvent(Long id)
    {
        Optional<Event> obj = eventRepository.findById(id);
        return obj.orElseThrow(() -> new DataNotFoundException(id));
    }

    public boolean saveEvent(Event event)
    {
        try
        {
            Event obj = eventRepository.save(event);
        }
        catch (Exception ex)
        {
            throw new DataNotPossibleException("Service error, exception: " + ex.getMessage());
        }
        return true;
    }

}
