package com.devjima.backend.controller;

import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.dto.CommentResponseDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.exception.UnauthorizedException;
import com.devjima.backend.model.User;
import com.devjima.backend.service.CommentService;
import com.devjima.backend.util.AuthUtil;
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

@WebMvcTest(CommentController.class)
class CommentControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean private CommentService commentService;
  @MockitoBean private AuthUtil authUtil;
  @MockitoBean private JwtUtil jwtUtil;

  private CommentResponseDTO mockDTO(Long id) {
    return new CommentResponseDTO(id, "Test comment", "<p>Test comment</p>",
        "en", null, null,
        new AuthorDTO(1L, "testuser", "Test User", null), List.of());
  }

  private User mockUser(Long id) {
    User user = new User();
    user.setId(id);
    user.setUsername("testuser");
    user.setEmail("tanaka@devjima.com");
    return user;
  }

  // =====================
  // GET /api/comments/post/{postId}
  // =====================

  @Test
  void 投稿別コメント取得_正常な場合_200を返す() throws Exception {
    when(commentService.getCommentsByPost(1L)).thenReturn(List.of(mockDTO(1L)));

    mockMvc.perform(get("/api/comments/post/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].id").value(1));
  }

  @Test
  void 投稿別コメント取得_投稿が存在しない場合_404を返す() throws Exception {
    when(commentService.getCommentsByPost(99L))
        .thenThrow(new ResourceNotFoundException("Post not found"));

    mockMvc.perform(get("/api/comments/post/99"))
        .andExpect(status().isNotFound());
  }

  // =====================
  // POST /api/comments/post/{postId}
  // =====================

  @Test
  void コメント追加_正常な場合_201を返す() throws Exception {
    when(authUtil.getCurrentUser()).thenReturn(mockUser(1L));

    String requestBody = """
            {
                "body": "Test comment",
                "language": "en"
            }
            """;

    mockMvc.perform(post("/api/comments/post/1")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isCreated());
  }

  // =====================
  // POST /api/comments/reply/{commentId}
  // =====================

  @Test
  void 返信追加_正常な場合_201を返す() throws Exception {
    when(authUtil.getCurrentUser()).thenReturn(mockUser(1L));

    String requestBody = """
            {
                "body": "Reply comment",
                "language": "en"
            }
            """;

    mockMvc.perform(post("/api/comments/reply/1")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isCreated());
  }

  // =====================
  // DELETE /api/comments/{id}
  // =====================

  @Test
  void コメント削除_認可済みユーザーの場合_204を返す() throws Exception {
    when(authUtil.getCurrentUserEmail()).thenReturn("tanaka@devjima.com");

    mockMvc.perform(delete("/api/comments/1"))
        .andExpect(status().isNoContent());

    verify(commentService).deleteComment(1L, "tanaka@devjima.com");
  }

  @Test
  void コメント削除_未認可ユーザーの場合_403を返す() throws Exception {
    when(authUtil.getCurrentUserEmail()).thenReturn("hacker@evil.com");
    doThrow(new UnauthorizedException("Not authorized"))
        .when(commentService).deleteComment(1L, "hacker@evil.com");

    mockMvc.perform(delete("/api/comments/1"))
        .andExpect(status().isForbidden());
  }

  @Test
  void コメント削除_コメントが存在しない場合_404を返す() throws Exception {
    when(authUtil.getCurrentUserEmail()).thenReturn("tanaka@devjima.com");
    doThrow(new ResourceNotFoundException("Comment not found"))
        .when(commentService).deleteComment(99L, "tanaka@devjima.com");

    mockMvc.perform(delete("/api/comments/99"))
        .andExpect(status().isNotFound());
  }
}