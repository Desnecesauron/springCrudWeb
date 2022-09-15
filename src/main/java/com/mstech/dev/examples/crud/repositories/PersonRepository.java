package com.mstech.dev.examples.crud.repositories;

import com.mstech.dev.examples.crud.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long>
{



}
