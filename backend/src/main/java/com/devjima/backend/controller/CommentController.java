package com.devjima.backend.controller;

import com.devjima.backend.dto.CommentResponseDTO;
import com.devjima.backend.dto.CreateCommentRequestDTO;
import com.devjima.backend.model.User;
import com.devjima.backend.service.CommentService;
import com.devjima.backend.util.AuthUtil;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

  private final CommentService commentService;
  private final AuthUtil authUtil;

  public CommentController(
      CommentService commentService,
      AuthUtil authUtil) {
    this.commentService = commentService;
    this.authUtil = authUtil;
  }

  @GetMapping("/post/{postId}")
  public ResponseEntity<List<CommentResponseDTO>> getCommentsByPost(
      @PathVariable Long postId) {
    return ResponseEntity.ok(commentService.getCommentsByPost(postId));
  }

  @PostMapping("/post/{postId}")
  public ResponseEntity<String> addComment(
      @PathVariable Long postId,
      @RequestBody CreateCommentRequestDTO request) {
    User user = authUtil.getCurrentUser();

    commentService.addComment(postId, request.body(), request.language(), user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body("Comment created successfully");

  }

  @PostMapping("/reply/{commentId}")
  public ResponseEntity<String> addReply(
      @PathVariable Long commentId,
      @RequestBody CreateCommentRequestDTO request) {
    User user = authUtil.getCurrentUser();

    commentService.addReply(commentId, request.body(), request.language(), user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body("Comment created successfully");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
    String email = authUtil.getCurrentUserEmail();
    commentService.deleteComment(id, email);
    return ResponseEntity.noContent().build();
  }
}
