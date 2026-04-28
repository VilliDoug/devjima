package com.devjima.backend.controller;

import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.model.User;
import com.devjima.backend.service.PostService;
import com.devjima.backend.service.UserService;
import com.devjima.backend.util.AuthUtil;
import com.devjima.backend.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PostController.class)
class PostControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean private PostService postService;
  @MockitoBean private UserService userService;
  @MockitoBean private AuthUtil authUtil;
  @MockitoBean private JwtUtil jwtUtil;

  private PostResponseDTO mockDTO(Long id, String title) {
    return new PostResponseDTO(id, title, "test-post", "Test body", "<p>Test body</p>",
        "en", true, 0, null,
        new AuthorDTO(1L, "testuser", "Test User", null), List.of());
  }

  // =====================
  // GET /api/posts
  // =====================

  @Test
  void 全投稿取得_正常な場合_200を返す() throws Exception {
    when(postService.getAllPosts()).thenReturn(List.of(mockDTO(1L, "Test Post")));

    mockMvc.perform(get("/api/posts"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("Test Post"));
  }

  // =====================
  // GET /api/posts/{id}
  // =====================

  @Test
  void 投稿取得_存在するIDの場合_200を返す() throws Exception {
    when(postService.getPostById(1L)).thenReturn(mockDTO(1L, "Test Post"));

    mockMvc.perform(get("/api/posts/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value("Test Post"));
  }

  @Test
  void 投稿取得_存在しないIDの場合_404を返す() throws Exception {
    when(postService.getPostById(99L))
        .thenThrow(new ResourceNotFoundException("Post not found"));

    mockMvc.perform(get("/api/posts/99"))
        .andExpect(status().isNotFound());
  }

  // =====================
  // GET /api/posts/recent
  // =====================

  @Test
  void 最新投稿取得_正常な場合_200を返す() throws Exception {
    when(postService.getPostsSortedByRecent()).thenReturn(List.of(mockDTO(1L, "Test Post")));

    mockMvc.perform(get("/api/posts/recent"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("Test Post"));
  }

  // =====================
  // GET /api/posts/count
  // =====================

  @Test
  void 投稿数取得_正しい件数を返す() throws Exception {
    when(postService.getPostCount()).thenReturn(50L);

    mockMvc.perform(get("/api/posts/count"))
        .andExpect(status().isOk())
        .andExpect(content().string("50"));
  }

  // =====================
  // GET /api/posts/tag/{slug}
  // =====================

  @Test
  void タグ別投稿取得_正常な場合_200を返す() throws Exception {
    when(postService.getPostsByTag("java")).thenReturn(List.of(mockDTO(1L, "Java Post")));

    mockMvc.perform(get("/api/posts/tag/java"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("Java Post"));
  }

  // =====================
  // GET /api/posts/search
  // =====================

  @Test
  void 投稿検索_タイトルで検索_200を返す() throws Exception {
    when(postService.searchPosts("Test", null)).thenReturn(List.of(mockDTO(1L, "Test Post")));

    mockMvc.perform(get("/api/posts/search").param("title", "Test"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("Test Post"));
  }

  // =====================
  // GET /api/posts/user/{userId}
  // =====================

  @Test
  void 著者別投稿取得_正常な場合_200を返す() throws Exception {
    when(postService.getPostsByAuthor(1L)).thenReturn(List.of(mockDTO(1L, "Test Post")));

    mockMvc.perform(get("/api/posts/user/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].title").value("Test Post"));
  }

  // =====================
  // DELETE /api/posts/{id}
  // =====================

  @Test
  void 投稿削除_認可済みユーザーの場合_204を返す() throws Exception {
    when(authUtil.getCurrentUserEmail()).thenReturn("tanaka@devjima.com");

    mockMvc.perform(delete("/api/posts/1"))
        .andExpect(status().isNoContent());

    verify(postService).deletePost(1L, "tanaka@devjima.com");
  }

  // =====================
  // PUT /api/posts/{id}
  // =====================

  @Test
  void 投稿更新_正常リクエストの場合_200を返す() throws Exception {
    when(authUtil.getCurrentUserEmail()).thenReturn("tanaka@devjima.com");
    when(postService.updatePost(1L, "Updated", "Body", "en", "tanaka@devjima.com"))
        .thenReturn(mockDTO(1L, "Updated"));

    String requestBody = """
            {
                "title": "Updated",
                "body": "Body",
                "language": "en"
            }
            """;

    mockMvc.perform(put("/api/posts/1")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value("Updated"));
  }
}