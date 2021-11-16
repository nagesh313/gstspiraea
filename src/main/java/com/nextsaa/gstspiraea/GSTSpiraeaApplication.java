package com.nextsaa.gstspiraea;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class GSTSpiraeaApplication implements CommandLineRunner {


    public static void main(String[] args) {
        SpringApplication.run(GSTSpiraeaApplication.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println("");
    }

}