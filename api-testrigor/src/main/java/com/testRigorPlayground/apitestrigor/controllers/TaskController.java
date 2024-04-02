package com.testRigorPlayground.apitestrigor.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.testRigorPlayground.apitestrigor.domain.Task;
import com.testRigorPlayground.apitestrigor.services.TaskService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }
    
    @GetMapping
    public ResponseEntity<List<Task>> getTasks(){
        List<Task> tasks = this.service.getTasksFromList();
        System.out.println(tasks);
        return ResponseEntity.ok().body(tasks);
        
    }

    @GetMapping ("/esdras")
    public String test(){
        return "is gay";
    }

    @PostMapping
    public void addTask(){
        
    }
}
