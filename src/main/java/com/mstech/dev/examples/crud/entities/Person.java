package com.mstech.dev.examples.crud.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_persons")
public class Person implements Serializable
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(unique = true, nullable = false)
    private long cpf;
    @Column(nullable = false)
    private boolean excluido = false;
    private String endereco;
    private int cep;
    private String cidade;
    @Column(nullable = false)
    private boolean medico;
    private String crm;
    //CRM/SP 123456

    @JsonIgnore
    @OneToMany(mappedBy = "medic")
    private List<Event> events = new ArrayList<>();

    public Person() {
    }

    public Person(Long id, String nome, long cpf, boolean excluido, String endereco, int cep, String cidade, boolean medico, String crm) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.excluido = excluido;
        this.endereco = endereco;
        this.cep = cep;
        this.cidade = cidade;
        this.medico = medico;
        this.crm = crm;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public long getCpf() {
        return cpf;
    }

    public void setCpf(long cpf) {
        this.cpf = cpf;
    }

    public boolean isExcluido() {
        return excluido;
    }

    public void setExcluido(boolean excluido) {
        this.excluido = excluido;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public int getCep() {
        return cep;
    }

    public void setCep(int cep) {
        this.cep = cep;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public boolean isMedico() {
        return medico;
    }

    public void setMedico(boolean medico) {
        this.medico = medico;
    }

    public String getCrm() {
        return crm;
    }

    public void setCrm(String crm) {
        this.crm = crm;
    }

    public List<Event> getEvents() {
        return events;
    }
}
