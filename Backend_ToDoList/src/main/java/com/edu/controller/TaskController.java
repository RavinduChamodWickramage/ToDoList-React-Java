package com.edu.controller;

import com.edu.dto.TaskDTO;
import com.edu.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<TaskDTO> getTasksByUserId(@RequestParam Long userId) {
        return taskService.getTasksByUserId(userId);
    }

    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO, @RequestParam Long userId) {
        return taskService.createTask(taskDTO, userId);
    }

    @PutMapping("/{taskId}")
    public TaskDTO updateTask(@PathVariable Long taskId, @RequestBody TaskDTO taskDTO, @RequestParam Long userId) {
        taskDTO.setId(taskId); // Ensure the task ID is set
        return taskService.updateTask(taskDTO, userId);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId, @RequestParam Long userId) {
        taskService.deleteTask(taskId, userId);
    }
}
