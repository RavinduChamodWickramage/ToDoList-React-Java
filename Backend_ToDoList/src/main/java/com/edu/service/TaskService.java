package com.edu.service;

import com.edu.dto.TaskDTO;
import com.edu.entity.Task;
import com.edu.entity.User;
import com.edu.repository.TaskRepository;
import com.edu.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<TaskDTO> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId)
                .stream()
                .map(task -> modelMapper.map(task, TaskDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<TaskDTO> getTaskByIdAndUserId(Long taskId, Long userId) {
        return taskRepository.findByIdAndUserId(taskId, userId)
                .map(task -> modelMapper.map(task, TaskDTO.class));
    }

    public TaskDTO createTask(TaskDTO taskDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Task task = modelMapper.map(taskDTO, Task.class);
        task.setUser(user);
        Task savedTask = taskRepository.save(task);
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    public TaskDTO updateTask(TaskDTO taskDTO, Long userId) {
        Task task = taskRepository.findByIdAndUserId(taskDTO.getId(), userId)
                .orElseThrow(() -> new RuntimeException("Task not found or unauthorized"));
        modelMapper.map(taskDTO, task);
        Task updatedTask = taskRepository.save(task);
        return modelMapper.map(updatedTask, TaskDTO.class);
    }

    public void deleteTask(Long taskId, Long userId) {
        Task task = taskRepository.findByIdAndUserId(taskId, userId)
                .orElseThrow(() -> new RuntimeException("Task not found or unauthorized"));
        taskRepository.delete(task);
    }
}
