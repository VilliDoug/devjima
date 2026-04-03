package com.devjima.backend.controller;

import com.devjima.backend.dto.CreatePostRequestDTO;
import com.devjima.backend.model.User;
import com.devjima.backend.service.PostService;
import com.devjima.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
public class PostController {

  private final PostService postService;
  private final UserService userService;

  public PostController(PostService postService, UserService userService) {
    this.postService = postService;
    this.userService = userService;
  }

  @PostMapping("/new")
  public ResponseEntity<String> createPost(
      @RequestBody CreatePostRequestDTO request) {
    String email = (String) SecurityContextHolder.getContext()
        .getAuthentication()
        .getPrincipal();
    User user = userService.findByEmail(email);

    postService.createPost(request.title(), request.body(), request.language(), user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body("Post created successfully");
  }


}
