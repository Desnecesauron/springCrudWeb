package com.mstech.dev.examples.crud.exceptions;

public class DataNotFoundException extends RuntimeException
{
    public DataNotFoundException(Object id)
    {
        super("Resource not found. Id " + id);
    }

    public DataNotFoundException(Long cpf)
    {
        super("Resource not found. CPF " + cpf);
    }

    public DataNotFoundException()
    {
        super("Page not found, do you have wrote the link correct?");
    }

}
