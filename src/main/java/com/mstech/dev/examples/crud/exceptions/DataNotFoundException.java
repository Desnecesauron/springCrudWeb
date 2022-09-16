package com.mstech.dev.examples.crud.exceptions;

public class DataNotFoundException extends RuntimeException
{
    public DataNotFoundException(Object id)
    {
        super("Resource not found. Id " + id);
    }

    public DataNotFoundException()
    {
        super("Page not found, do you have wrote the link correct?");
    }

}
