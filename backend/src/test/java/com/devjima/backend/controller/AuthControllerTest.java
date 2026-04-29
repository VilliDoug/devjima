package com.devjima.backend.controller;

import com.devjima.backend.model.User;
import com.devjima.backend.service.UserService;
import com.devjima.backend.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean private UserService userService;
  @MockitoBean private JwtUtil jwtUtil;

  private User mockUser(Long id, String username, String email) {
    User user = new User();
    user.setId(id);
    user.setUsername(username);
    user.setEmail(email);
    return user;
  }

  // =====================
  // POST /api/auth/register
  // =====================

  @Test
  void ユーザー登録_正常なリクエストの場合_201を返す() throws Exception {
    String requestBody = """
            {
                "username": "tanaka_dev",
                "email": "tanaka@devjima.com",
                "password": "password123"
            }
            """;

    mockMvc.perform(post("/api/auth/register")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isCreated())
        .andExpect(content().string("User registered successfully"));
  }

  @Test
  void ユーザー登録_既存メールの場合_500を返す() throws Exception {
    doThrow(new RuntimeException("Email already in use"))
        .when(userService).registerUser("tanaka_dev", "tanaka@devjima.com", "password123");

    String requestBody = """
            {
                "username": "tanaka_dev",
                "email": "tanaka@devjima.com",
                "password": "password123"
            }
            """;

    mockMvc.perform(post("/api/auth/register")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isInternalServerError());
  }

  // =====================
  // POST /api/auth/login
  // =====================

  @Test
  void ユーザーログイン_正常なリクエストの場合_200とトークンを返す() throws Exception {
    User user = mockUser(1L, "tanaka_dev", "tanaka@devjima.com");

    when(userService.loginUser("tanaka@devjima.com", "password123")).thenReturn(user);
    when(jwtUtil.generateToken("tanaka@devjima.com")).thenReturn("mock.jwt.token");

    String requestBody = """
            {
                "email": "tanaka@devjima.com",
                "password": "password123"
            }
            """;

    mockMvc.perform(post("/api/auth/login")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value("mock.jwt.token"))
        .andExpect(jsonPath("$.userId").value(1))
        .andExpect(jsonPath("$.username").value("tanaka_dev"));
  }

  @Test
  void ユーザーログイン_無効なパスワードの場合_500を返す() throws Exception {
    doThrow(new RuntimeException("Invalid password"))
        .when(userService).loginUser("tanaka@devjima.com", "wrongpassword");

    String requestBody = """
            {
                "email": "tanaka@devjima.com",
                "password": "wrongpassword"
            }
            """;

    mockMvc.perform(post("/api/auth/login")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isInternalServerError());
  }
}