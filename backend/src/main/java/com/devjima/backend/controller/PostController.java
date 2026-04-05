package com.devjima.backend.controller;

import com.devjima.backend.dto.CreatePostRequestDTO;
import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.model.User;
import com.devjima.backend.service.PostService;
import com.devjima.backend.service.UserService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

  @GetMapping
  public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
    List<PostResponseDTO> posts = postService.getAllPosts();
    return ResponseEntity.ok(posts);
  }

  @GetMapping("/{id}")
  public ResponseEntity<PostResponseDTO> getPostById(
      @PathVariable Long id) {
    PostResponseDTO post = postService.getPostById(id);
    return ResponseEntity.ok(post);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<PostResponseDTO>> getPostsByAuthor(
      @PathVariable Long userId) {
    List<PostResponseDTO> posts = postService.getPostsByAuthor(userId);
    return ResponseEntity.ok(posts);
  }

  @PutMapping("/{id}")
  public ResponseEntity<PostResponseDTO> updatePost(
      @PathVariable Long id,
      @RequestBody CreatePostRequestDTO request
  ) {
    String email = (String) SecurityContextHolder.getContext()
        .getAuthentication()
        .getPrincipal();

    return ResponseEntity.ok(
        postService.updatePost(
            id, request.title(), request.body(), request.language(), email
        )
    );
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deletePost(
      @PathVariable Long id
  ) {
    String email = (String) SecurityContextHolder.getContext()
        .getAuthentication()
        .getPrincipal();
    postService.deletePost(id, email);
    return ResponseEntity.ok("Post deleted successfully");
  }

  @GetMapping("/search")
  public ResponseEntity<List<PostResponseDTO>> getSearchedPosts(
      @RequestParam(required = false) String title,
      @RequestParam(required = false) String language
  ) {
    return ResponseEntity.ok(postService.searchPosts(title, language));
  }
}
