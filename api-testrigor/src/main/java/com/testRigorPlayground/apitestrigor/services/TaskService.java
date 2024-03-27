package com.testRigorPlayground.apitestrigor.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.testRigorPlayground.apitestrigor.domain.Task;
import com.testRigorPlayground.apitestrigor.feign.TaskClient;

@Service
public class TaskService {
    
    private final TaskClient taskClient;

    public TaskService(TaskClient client){
        this.taskClient = client;
    }

    public List<Task> getTasksFromList(){
        return this.taskClient.getTasks();
    }
}
