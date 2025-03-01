package com.edu.controller;

import com.edu.dto.UserDTO;
import com.edu.dto.UserDetailDTO;
import com.edu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public UserDTO getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/{userId}")
    public UserDTO updateUserDetails(@PathVariable Long userId, @RequestBody UserDetailDTO userDetailDTO) {
        return userService.updateUserDetails(userId, userDetailDTO);
    }
}
