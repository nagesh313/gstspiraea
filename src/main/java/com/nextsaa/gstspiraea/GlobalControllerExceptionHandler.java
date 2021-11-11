package com.nextsaa.gstspiraea;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.rmi.ServerException;

@ControllerAdvice
public class GlobalControllerExceptionHandler {
    @ExceptionHandler(ServerException.class)
    protected ResponseEntity<Object> handleEmailAlreadyPresent(
            RuntimeException ex, WebRequest request) {
        return new ResponseEntity<Object>(
                "Email Already Exist", new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}