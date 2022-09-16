package com.mstech.dev.examples.crud.entities;

import com.mstech.dev.examples.crud.entities.enums.scheduleTimes;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "events")
public class event
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //https://stackoverflow.com/questions/52004135/spring-boot-jpa-how-to-implement-foreign-key-between-users-and-authorities-table
    private Person patient; //falta criar a chave estrangeira aqui e criar na outra "tabela" a ligação
    private Person medic; //falta criar a chave estrangeira aqui e criar na outra "tabela" a ligação
    private scheduleTimes hour;
    private LocalDate dayEvent;

    public event() {
    }

    public event(Person patient, Person medic, scheduleTimes hour, LocalDate dayEvent) {
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
