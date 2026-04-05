package com.devjima.backend.util;

import com.devjima.backend.model.User;
import com.devjima.backend.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

  private final UserService userService;

  public AuthUtil(UserService userService) {
    this.userService = userService;
  }

  public User getCurrentUser() {
    String email = (String) SecurityContextHolder.getContext()
        .getAuthentication()
        .getPrincipal();
    User user = userService.findByEmail(email);
    return userService.findByEmail(email);
  }

  public String getCurrentUserEmail() {
    return (String) SecurityContextHolder.getContext()
        .getAuthentication()
        .getPrincipal();
  }

}
