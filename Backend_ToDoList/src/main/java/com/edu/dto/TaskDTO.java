package com.edu.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskDTO {

    private Long id;

    private String title;

    private String description;

    private LocalDate dueDate;

    private boolean isCompleted;

    private Long userId;
}
