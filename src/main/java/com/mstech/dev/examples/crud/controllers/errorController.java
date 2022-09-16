package com.mstech.dev.examples.crud.controllers;

import com.mstech.dev.examples.crud.exceptions.DataNotFoundException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class errorController implements ErrorController
{

    @RequestMapping(value = "/error")
    public void errorPageResponse(HttpServletRequest request)
    {
        throw new DataNotFoundException();
    }

}
