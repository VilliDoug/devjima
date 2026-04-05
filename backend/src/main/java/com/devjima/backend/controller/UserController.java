package com.devjima.backend.controller;

import com.devjima.backend.dto.UpdateProfileRequestDTO;
import com.devjima.backend.dto.UserProfileDTO;
import com.devjima.backend.service.UserService;
import com.devjima.backend.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;
  private final AuthUtil authUtil;

  public UserController(UserService userService, AuthUtil authUtil) {
    this.userService = userService;
    this.authUtil = authUtil;
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserProfileDTO> getUserProfileById(@PathVariable Long id) {
    return ResponseEntity.ok(userService.getUserProfile(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<UserProfileDTO> updateUserProfileById(
      @PathVariable Long id,
      @RequestBody UpdateProfileRequestDTO request) {
    String email = authUtil.getCurrentUserEmail();

    return ResponseEntity.ok(userService.updateUserProfile(
        id, request.displayName(), request.bio(),
        request.avatarUrl(), request.preferredLang(), email)
    );
  }

}
