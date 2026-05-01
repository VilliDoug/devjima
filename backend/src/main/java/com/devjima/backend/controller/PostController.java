package com.devjima.backend.controller;

import com.devjima.backend.dto.CreatePostRequestDTO;
import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.model.User;
import com.devjima.backend.service.PostService;
import com.devjima.backend.service.UserService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "投稿", description = "投稿管理エンドポイント")
@RestController
@RequestMapping("/api/posts")
public class PostController {

  private final PostService postService;
  private final UserService userService;
  private final AuthUtil authUtil;

  public PostController(
      PostService postService, UserService userService, AuthUtil authUtil) {
    this.postService = postService;
    this.userService = userService;
    this.authUtil = authUtil;
  }

  @Operation(summary = "投稿を作成", description = "認証済みユーザーが新しい投稿を作成する")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "投稿作成成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です")
  })
  @SecurityRequirement(name = "bearerAuth")
  @PostMapping("/new")
  public ResponseEntity<PostResponseDTO> createPost(
      @RequestBody CreatePostRequestDTO request) {
    User user = authUtil.getCurrentUser();

    PostResponseDTO post = postService.createPost(
        request.title(), request.body(), request.language(), user.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(post);
  }

  @Operation(summary = "全投稿を取得", description = "システム内の全投稿を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功")
  })
  @GetMapping
  public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
    List<PostResponseDTO> posts = postService.getAllPosts();
    return ResponseEntity.ok(posts);
  }

  @Operation(summary = "IDで投稿を取得", description = "指定されたIDの投稿を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功"),
      @ApiResponse(responseCode = "404", description = "投稿が見つかりません")
  })
  @GetMapping("/{id}")
  public ResponseEntity<PostResponseDTO> getPostById(
      @Parameter(description = "投稿ID", example = "1")
      @PathVariable Long id) {
    PostResponseDTO post = postService.getPostById(id);
    return ResponseEntity.ok(post);
  }

  @Operation(summary = "著者別投稿を取得", description = "指定されたユーザーの全投稿を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功"),
      @ApiResponse(responseCode = "404", description = "ユーザーが見つかりません")
  })
  @GetMapping("/user/{userId}")
  public ResponseEntity<List<PostResponseDTO>> getPostsByAuthor(
      @Parameter(description = "著者のユーザーID", example = "1")
      @PathVariable Long userId) {
    List<PostResponseDTO> posts = postService.getPostsByAuthor(userId);
    return ResponseEntity.ok(posts);
  }

  @Operation(summary = "最新投稿を取得", description = "作成日時の降順で全投稿を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功")
  })
  @GetMapping("/recent")
  public ResponseEntity<List<PostResponseDTO>> getPostsSortedByRecent() {
    List<PostResponseDTO> posts = postService.getPostsSortedByRecent();
    return ResponseEntity.ok(posts);
  }

  @Operation(summary = "投稿を更新", description = "投稿を更新する。著者のみ更新可能")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "更新成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "403", description = "権限がありません"),
      @ApiResponse(responseCode = "404", description = "投稿が見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @PutMapping("/{id}")
  public ResponseEntity<PostResponseDTO> updatePost(
      @Parameter(description = "更新する投稿ID", example = "1")
      @PathVariable Long id,
      @RequestBody CreatePostRequestDTO request
  ) {
    String email = authUtil.getCurrentUserEmail();

    return ResponseEntity.ok(
        postService.updatePost(
            id, request.title(), request.body(), request.language(), email
        )
    );
  }

  @Operation(summary = "投稿を削除", description = "投稿を削除する。著者のみ削除可能")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "削除成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "403", description = "権限がありません"),
      @ApiResponse(responseCode = "404", description = "投稿が見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deletePost(
      @Parameter(description = "削除する投稿ID", example = "1")
      @PathVariable Long id
  ) {
    String email = authUtil.getCurrentUserEmail();

    postService.deletePost(id, email);
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "投稿を検索", description = "タイトル・言語・両方で投稿を検索する")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "検索成功")
  })
  @GetMapping("/search")
  public ResponseEntity<List<PostResponseDTO>> getSearchedPosts(
      @Parameter(description = "検索キーワード（タイトル部分一致）", example = "Spring Boot")
      @RequestParam(required = false) String title,
      @Parameter(description = "言語コードでフィルター", example = "ja")
      @RequestParam(required = false) String language
  ) {
    return ResponseEntity.ok(postService.searchPosts(title, language));
  }

  @Operation(summary = "投稿数の取得", description = "投稿の総数を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功")
  })
  @GetMapping("/count")
  public ResponseEntity<Long> getPostCount() {
    return ResponseEntity.ok(postService.getPostCount());
  }

  @Operation(summary = "タグ別投稿を取得", description = "指定されたタグスラッグに関連する全投稿を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功"),
      @ApiResponse(responseCode = "404", description = "タグが見つかりません")
  })
  @GetMapping("/tag/{slug}")
  public ResponseEntity<List<PostResponseDTO>> getPostsByTag(
      @Parameter(description = "タグスラッグ", example = "java")
      @PathVariable String slug
  ) {
    return ResponseEntity.ok(postService.getPostsByTag(slug));
  }
}
