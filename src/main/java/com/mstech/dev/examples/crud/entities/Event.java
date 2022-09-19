package com.mstech.dev.examples.crud.entities;

import com.mstech.dev.examples.crud.entities.enums.scheduleTimes;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "events")
public class Event
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_event;
    @OneToOne
    private Person patient;
    @OneToOne
    private Person medic;
    private scheduleTimes hour;
    private LocalDate dayEvent;
    public Event() {
    }

    public Event(Person patient, Person medic, scheduleTimes hour, LocalDate dayEvent) {
        if(medic.isMedico() && !(patient.isMedico()))
        {
            this.patient = patient;
            this.medic = medic;
            this.hour = hour;
            this.dayEvent = dayEvent;
        }
    }

    public Person getPatient() {
        return patient;
    }

    public void setPatient(Person patient) {
        this.patient = patient;
    }

    public Person getMedic() {
        return medic;
    }

    public void setMedic(Person medic) {
        this.medic = medic;
    }

    public scheduleTimes getHour() {
        return hour;
    }

    public void setHour(scheduleTimes hour) {
        this.hour = hour;
    }

    public LocalDate getDayEvent() {
        return dayEvent;
    }

    public void setDayEvent(LocalDate dayEvent) {
        this.dayEvent = dayEvent;
    }
}