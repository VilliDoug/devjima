package com.devjima.backend.controller;

import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.service.TagService;
import com.devjima.backend.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TagController.class)
class TagControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean private TagService tagService;
  @MockitoBean private JwtUtil jwtUtil;

  private TagDTO mockTagDTO(Long id, String name) {
    return new TagDTO(id, name, name.toLowerCase());
  }

  private PostResponseDTO mockPostDTO(Long id) {
    return new PostResponseDTO(id, "Test Post", "test-post", "Body", "<p>Body</p>",
        "en", true, 0, null,
        new AuthorDTO(1L, "testuser", "Test User", null), List.of());
  }

  // =====================
  // GET /api/tags
  // =====================

  @Test
  void 全タグ取得_正常な場合_200を返す() throws Exception {
    when(tagService.getAllTags()).thenReturn(List.of(mockTagDTO(1L, "java")));

    mockMvc.perform(get("/api/tags"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].name").value("java"));
  }

  @Test
  void 全タグ取得_タグが存在しない場合_空リストを返す() throws Exception {
    when(tagService.getAllTags()).thenReturn(List.of());

    mockMvc.perform(get("/api/tags"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isEmpty());
  }

  // =====================
  // POST /api/tags/{tagId}/posts/{postId}
  // =====================

  @Test
  void 投稿にタグ追加_正常な場合_200を返す() throws Exception {
    when(tagService.addTagToPost(1L, 1L)).thenReturn(mockPostDTO(1L));

    mockMvc.perform(post("/api/tags/1/posts/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value("Test Post"));
  }

  @Test
  void 投稿にタグ追加_投稿が存在しない場合_404を返す() throws Exception {
    when(tagService.addTagToPost(99L, 1L))
        .thenThrow(new ResourceNotFoundException("Post not found"));

    mockMvc.perform(post("/api/tags/1/posts/99"))
        .andExpect(status().isNotFound());
  }

  // =====================
  // DELETE /api/tags/{tagId}/posts/{postId}
  // =====================

  @Test
  void 投稿からタグ削除_正常な場合_204を返す() throws Exception {
    mockMvc.perform(delete("/api/tags/1/posts/1"))
        .andExpect(status().isNoContent());

    verify(tagService).deleteTagFromPost(1L, 1L);
  }

  @Test
  void 投稿からタグ削除_投稿が存在しない場合_404を返す() throws Exception {
    doThrow(new ResourceNotFoundException("Post not found"))
        .when(tagService).deleteTagFromPost(1L, 99L);

    mockMvc.perform(delete("/api/tags/1/posts/99"))
        .andExpect(status().isNotFound());
  }
}