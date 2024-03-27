package com.testRigorPlayground.apitestrigor.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.testRigorPlayground.apitestrigor.domain.Task;


@FeignClient (name = "task-trp-api", url = "https://tasks-trp-api.s3.sa-east-1.amazonaws.com")
public interface TaskClient {
    @GetMapping("/tasks.json")
    List<Task> getTasks();
}
