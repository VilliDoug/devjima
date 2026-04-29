package com.devjima.backend.controller;

import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "タグ", description = "タグ管理エンドポイント")
@RestController
@RequestMapping("/api/tags")
public class TagController {

  private TagService tagService;

  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  @Operation(summary = "全タグを取得", description = "システム内の全タグ一覧を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功")
  })
  @GetMapping
  public ResponseEntity<List<TagDTO>> getAllTags() {
    List<TagDTO> tags = tagService.getAllTags();
    return ResponseEntity.ok(tags);
  }

  @Operation(summary = "投稿にタグを追加", description = "指定された投稿に指定されたタグを追加")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "追加成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "404", description = "投稿またはタグが見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @PostMapping("/{tagId}/posts/{postId}")
  public ResponseEntity<PostResponseDTO> addTagToPost(
      @Parameter(description = "追加する投稿ID", example = "1")
      @PathVariable Long postId,
      @Parameter(description = "追加するタグID", example = "1")
      @PathVariable Long tagId)
  {
    return ResponseEntity.ok(tagService.addTagToPost(postId, tagId));
  }

  @Operation(summary = "投稿からタグ削除", description = "指定された投稿から指定されたタグを削除する")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "削除成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "404", description = "投稿またはタグが見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @DeleteMapping("/{tagId}/posts/{postId}")
  public ResponseEntity<Void> removeTagFromPost (
      @Parameter(description = "削除するタグID", example = "1")
      @PathVariable Long tagId,
      @Parameter(description = "対象の投稿ID", example = "1")
      @PathVariable Long postId) {
    tagService.deleteTagFromPost(tagId, postId);
    return ResponseEntity.noContent().build();
  }
}
