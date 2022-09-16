package com.mstech.dev.examples.crud.exceptions;

public class DataNotPossibleException extends RuntimeException
{
    public DataNotPossibleException(String error)
    {
        super(error);
    }
}
