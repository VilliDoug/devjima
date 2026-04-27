package com.devjima.backend.controller;

import com.devjima.backend.dto.UserProfileDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.exception.UnauthorizedException;
import com.devjima.backend.service.UserService;
import com.devjima.backend.util.AuthUtil;
import com.devjima.backend.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private JwtUtil jwtUtil;

  @MockitoBean
  private UserService userService;

  @MockitoBean
  private AuthUtil authUtil;

  // =====================
  // GET /api/users/{id}
  // =====================

  @Test
  void プロフィール取得_存在するIDの場合_200を返す() throws Exception {
    UserProfileDTO dto = new UserProfileDTO(
        1L, "tanaka_dev", "Tanaka", null, null, "ja", null, null, null);

    when(userService.getUserProfile(1L)).thenReturn(dto);

    mockMvc.perform(get("/api/users/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("tanaka_dev"))
        .andExpect(jsonPath("$.displayName").value("Tanaka"));
  }

  @Test
  void プロフィール取得_存在しないIDの場合_404を返す() throws Exception {
    when(userService.getUserProfile(99L))
        .thenThrow(new ResourceNotFoundException("User not found"));

    mockMvc.perform(get("/api/users/99"))
        .andExpect(status().isNotFound());
  }

  // =====================
  // GET /api/users/count
  // =====================

  @Test
  void ユーザー数取得_正しい件数を返す() throws Exception {
    when(userService.getUserCount()).thenReturn(10L);

    mockMvc.perform(get("/api/users/count"))
        .andExpect(status().isOk())
        .andExpect(content().string("10"));
  }

  // =====================
  // GET /api/users/countries/count
  // =====================

  @Test
  void 国数取得_正しい件数を返す() throws Exception {
    when(userService.getCountryCount()).thenReturn(5L);

    mockMvc.perform(get("/api/users/countries/count"))
        .andExpect(status().isOk())
        .andExpect(content().string("5"));
  }

  // =====================
  // PUT /api/users/{id}
  // =====================

  @Test
  void プロフィール更新_正常リクエストの場合_200を返す() throws Exception {
    UserProfileDTO dto = new UserProfileDTO(
        1L, "tanaka_dev", "Tanaka Updated", null, null, "ja", null, null, null);

    when(authUtil.getCurrentUserEmail()).thenReturn("tanaka@devjima.com");
    when(userService.updateUserProfile(
        1L, "Tanaka Updated", null, null, "ja", null, "tanaka@devjima.com"))
        .thenReturn(dto);

    String requestBody = """
            {
                "displayName": "Tanaka Updated",
                "bio": null,
                "avatarUrl": null,
                "preferredLang": "ja",
                "country": null
            }
            """;

    mockMvc.perform(put("/api/users/1")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.displayName").value("Tanaka Updated"));
  }

  @Test
  void プロフィール更新_未認可ユーザーの場合_403を返す() throws Exception {
    when(authUtil.getCurrentUserEmail()).thenReturn("hacker@evil.com");
    when(userService.updateUserProfile(
        1L, "Hacker", null, null, "en", null, "hacker@evil.com"))
        .thenThrow(new UnauthorizedException("Not authorized"));

    String requestBody = """
        {
            "displayName": "Hacker",
            "bio": null,
            "avatarUrl": null,
            "preferredLang": "en",
            "country": null
        }
        """;

    mockMvc.perform(put("/api/users/1")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isForbidden());
  }
}