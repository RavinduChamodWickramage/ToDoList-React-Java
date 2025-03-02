package com.edu.controller;

import com.edu.dto.TaskDTO;
import com.edu.entity.Task;
import com.edu.service.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private ModelMapper modelMapper;

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

    @PatchMapping("/{taskId}/status")
    public TaskDTO updateTaskStatus(
            @PathVariable Long taskId,
            @RequestParam Long userId,
            @RequestBody Map<String, Boolean> request
    ) {
        boolean isCompleted = request.get("isCompleted");
        TaskDTO updatedTask = taskService.updateTaskStatus(taskId, userId, isCompleted);
        return modelMapper.map(updatedTask, TaskDTO.class);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId, @RequestParam Long userId) {
        taskService.deleteTask(taskId, userId);
    }
}
