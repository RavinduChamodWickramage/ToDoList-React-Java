package com.edu.controller;

import com.edu.dto.LoginRequestDTO;
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
    public String login(@RequestBody LoginRequestDTO loginRequestDTO) {
        return authService.authenticateUser(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
    }

    @PostMapping("/signup")
    public UserDTO signUp(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }
}
