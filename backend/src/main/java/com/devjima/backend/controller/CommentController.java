package com.devjima.backend.controller;

import com.devjima.backend.dto.CommentResponseDTO;
import com.devjima.backend.dto.CreateCommentRequestDTO;
import com.devjima.backend.model.User;
import com.devjima.backend.service.CommentService;
import com.devjima.backend.util.AuthUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "コメント", description = "コメント管理エンドポイント")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

  private final CommentService commentService;
  private final AuthUtil authUtil;

  public CommentController(
      CommentService commentService,
      AuthUtil authUtil
  ) {
    this.commentService = commentService;
    this.authUtil = authUtil;
  }

  @Operation(summary = "投稿のコメントを取得", description = "指定された投稿のトップレベルコメント一覧を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功"),
      @ApiResponse(responseCode = "404", description = "投稿が見つかりません")
  })
  @GetMapping("/post/{postId}")
  public ResponseEntity<List<CommentResponseDTO>> getCommentsByPost(
      @Parameter(description = "投稿ID", example = "1")
      @PathVariable Long postId
  ) {
    return ResponseEntity.ok(commentService.getCommentsByPost(postId));
  }

  @Operation(summary = "コメントを追加", description = "指定された投稿にコメントを追加する。認証が必要")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "コメント追加成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "404", description = "投稿が見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @PostMapping("/post/{postId}")
  public ResponseEntity<String> addComment(
      @Parameter(description = "コメントを追加する投稿ID", example = "1")
      @PathVariable Long postId,
      @RequestBody CreateCommentRequestDTO request
  ) {
    User user = authUtil.getCurrentUser();

    commentService.addComment(postId, request.body(), request.language(), user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body("Comment created successfully");

  }

  @Operation(summary = "コメント返信を追加", description = "指定されたコメントに返信を追加する。認証が必要")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "返信追加成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "404", description = "コメントが見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @PostMapping("/reply/{commentId}")
  public ResponseEntity<String> addReply(
      @Parameter(description = "返信先コメントID", example = "1")
      @PathVariable Long commentId,
      @RequestBody CreateCommentRequestDTO request
  ) {
    User user = authUtil.getCurrentUser();

    commentService.addReply(commentId, request.body(), request.language(), user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body("Comment created successfully");
  }

  @Operation(summary = "コメントを削除", description = "コメントを論理削除する。コメントの著者のみ削除可能")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "削除成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "403", description = "権限がありません"),
      @ApiResponse(responseCode = "404", description = "コメントが見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteComment(
      @Parameter(description = "削除するコメントID", example = "1")
      @PathVariable Long id
  ) {
    String email = authUtil.getCurrentUserEmail();
    commentService.deleteComment(id, email);
    return ResponseEntity.noContent().build();
  }
}
