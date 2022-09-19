package com.mstech.dev.examples.crud.repositories;

import com.mstech.dev.examples.crud.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long>
{



}
