package com.mstech.dev.examples.crud.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;

@ControllerAdvice
public class ResourceExceptionHandler
{

    @ExceptionHandler(DataNotPossibleException.class)
    public ResponseEntity<StandardError> dataNotPossible(DataNotPossibleException e, HttpServletRequest request)
    {

        String error = "Data not allowed: " + e.getMessage();
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        StandardError err = new StandardError(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);

    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<StandardError> resourceNotFound(DataNotFoundException e, HttpServletRequest request)
    {

        String error = "Resource not found";
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError err = new StandardError(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI());
        return ResponseEntity.status(status).body(err);

    }



}
