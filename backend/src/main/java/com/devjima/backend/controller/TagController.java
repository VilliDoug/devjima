package com.devjima.backend.controller;

import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
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
  @GetMapping
  public ResponseEntity<List<TagDTO>> getAllTags() {
    List<TagDTO> tags = tagService.getAllTags();
    return ResponseEntity.ok(tags);
  }

  @Operation(summary = "投稿にタグを追加", description = "指定された投稿に指定されたタグを追加")
  @PostMapping("/{tagId}/posts/{postId}")
  public ResponseEntity<PostResponseDTO> addTagToPost(
      @PathVariable Long postId,
      @PathVariable Long tagId)
  {
    return ResponseEntity.ok(tagService.addTagToPost(postId, tagId));
  }

  @Operation(summary = "投稿からタグ削除", description = "指定された投稿から指定されたタグを削除する")
  @DeleteMapping("/{tagId}/posts/{postId}")
  public ResponseEntity<Void> removeTagFromPost (
      @PathVariable Long tagId,
      @PathVariable Long postId) {
    tagService.deleteTagFromPost(tagId, postId);
    return ResponseEntity.noContent().build();
  }
}
