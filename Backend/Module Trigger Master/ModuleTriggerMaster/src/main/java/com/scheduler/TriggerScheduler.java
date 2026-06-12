package com.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Component;

import com.service.TriggerService;

@Component
@EnableScheduling
public class TriggerScheduler {

    @Autowired
    private TriggerService service;

    @Scheduled(fixedRate = 5000)
    public void run() {
        System.out.println("Scheduler Running...");
        service.execute();
    }
}



