package com.mstech.dev.examples.crud.entities;

import com.mstech.dev.examples.crud.controllers.PersonController;
import com.mstech.dev.examples.crud.entities.enums.scheduleTimes;
import com.mstech.dev.examples.crud.service.PersonService;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
@Entity
@Table(name = "tb_events")
public class Event implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_event;
    private scheduleTimes hour_event;
    private LocalDate dayEvent;
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Person patient;
    @ManyToOne
    @JoinColumn(name = "medic_id")
    private Person medic;
    public Event()
    {

    }
    public Event(Person patient, Person medic, scheduleTimes hour_event, LocalDate dayEvent) throws Exception {
        if(medic.isMedico())
        {
            this.id_event = null;
            this.patient = patient;
            this.medic = medic;
            this.hour_event = hour_event;
            this.dayEvent = dayEvent;
        }
        else
        {
            throw new Exception("Element not created: medic person is not a medic!");
        }
    }

    public Event(Long patientId, Long medicId, scheduleTimes hour_event, LocalDate dayEvent) throws Exception {
        PersonController personController = new PersonController();
        Person patient = personController.returnPerson(patientId);
        Person medic = personController.returnPerson(medicId);

        if(medic.isMedico())
        {
            this.id_event = null;
            this.patient = patient;
            this.medic = medic;
            this.hour_event = hour_event;
            this.dayEvent = dayEvent;
        }
        else
        {
            throw new Exception("Element not created: medic person is not a medic!");
        }
    }

    public Person getPatient()
    {
        return patient;
    }
    public void setPatient(Person patient)
    {
        this.patient = patient;
    }
    public Person getMedic()
    {
        return medic;
    }
    public void setMedic(Person medic)
    {
        this.medic = medic;
    }
    public scheduleTimes getHour_event()
    {
        return hour_event;
    }
    public void setHour_event(scheduleTimes hour_event)
    {
        this.hour_event = hour_event;
    }
    public LocalDate getDayEvent()
    {
        return dayEvent;
    }
    public void setDayEvent(LocalDate dayEvent)
    {
        this.dayEvent = dayEvent;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id_event=" + id_event +
                ", hour_event=" + hour_event +
                ", dayEvent=" + dayEvent +
                ", patient=" + patient +
                ", medic=" + medic +
                '}';
    }
}