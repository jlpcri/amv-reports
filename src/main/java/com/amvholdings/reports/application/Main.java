package com.amvholdings.reports.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"com.amvholdings.reports"})
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        // System.setProperty("javax.net.ssl.keyStorePassword","changeit");
        SpringApplication.run(Main.class, args);
    }
}