package com.edu.controller;

import com.edu.dto.LoginRequest;
import com.edu.dto.UserDTO;
import com.edu.service.AuthService;
import com.edu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
    }

    @PostMapping("/signup")
    public UserDTO signUp(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }
}
