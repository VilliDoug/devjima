package com.devjima.backend.controller;

import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.service.TagService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tags")
public class TagController {

  private TagService tagService;

  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  @GetMapping
  public ResponseEntity<List<TagDTO>> getAllTags() {
    List<TagDTO> tags = tagService.getAllTags();
    return ResponseEntity.ok(tags);
  }

  @PostMapping("/{tagId}/posts/{postId}")
  public ResponseEntity<PostResponseDTO> addTagToPost(
      @PathVariable Long postId,
      @PathVariable Long tagId)
  {
    return ResponseEntity.ok(tagService.addTagToPost(postId, tagId));
  }

}
