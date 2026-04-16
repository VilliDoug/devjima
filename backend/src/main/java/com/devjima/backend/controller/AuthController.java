package com.devjima.backend.controller;

import com.devjima.backend.dto.LoginRequestDTO;
import com.devjima.backend.dto.LoginResponseDTO;
import com.devjima.backend.dto.RegisterRequestDTO;
import com.devjima.backend.model.User;
import com.devjima.backend.service.UserService;
import com.devjima.backend.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private UserService userService;
  private JwtUtil jwtUtil;

  public AuthController(UserService userService, JwtUtil jwtUtil) {
    this.userService = userService;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<String> registerUser(
      @Valid @RequestBody RegisterRequestDTO request) {
    userService.registerUser(request.username(), request.email(), request.password());
    return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
  }

//  Method using JWT, returns a header (algorithm used - HS256)
//  Payload - the data
//  Signature - proves it wasn't tampered with
  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> loginUser(
      @Valid @RequestBody LoginRequestDTO request) {
    User user = userService.loginUser(request.email(), request.password());
    String token = jwtUtil.generateToken(request.email());
    return ResponseEntity.ok(new LoginResponseDTO(token, user.getId()));
  }
}
