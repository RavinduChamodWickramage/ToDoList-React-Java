package com.edu.controller;

import com.edu.dto.TaskDTO;
import com.edu.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<TaskDTO> getTasksByUserId(@RequestParam Long userId) {
        return taskService.getTasksByUserId(userId);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskDTO> getTaskById(
            @PathVariable Long taskId,
            @RequestParam Long userId,
            @RequestHeader("Authorization") String token
    ) {
        Optional<TaskDTO> taskOptional = taskService.getTaskByIdAndUserId(taskId, userId);
        return taskOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO, @RequestParam Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        TaskDTO createdTask = taskService.createTask(taskDTO, userId);
        return ResponseEntity.ok(createdTask);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long taskId, @RequestBody TaskDTO taskDTO, @RequestParam Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        taskDTO.setId(taskId);
        TaskDTO updatedTask = taskService.updateTask(taskDTO, userId);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId, @RequestParam Long userId) {
        taskService.deleteTask(taskId, userId);
    }
}
