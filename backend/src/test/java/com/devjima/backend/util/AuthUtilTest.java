package com.devjima.backend.util;

import com.devjima.backend.model.User;
import com.devjima.backend.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthUtilTest {

  @Mock
  private UserService userService;

  @InjectMocks
  private AuthUtil authUtil;

  @AfterEach
  void clearSecurityContext() {
    SecurityContextHolder.clearContext();
  }

  private void setAuthentication(String email) {
    UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(email, null, List.of());
    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  // =====================
  // getCurrentUserEmail
  // =====================

  @Test
  void 現在のユーザーメール取得_認証済みの場合_メールを返す() {
    setAuthentication("tanaka@devjima.com");

    String result = authUtil.getCurrentUserEmail();

    assertThat(result).isEqualTo("tanaka@devjima.com");
  }

  // =====================
  // getCurrentUser
  // =====================

  @Test
  void 現在のユーザー取得_認証済みの場合_ユーザーを返す() {
    User user = new User();
    user.setEmail("tanaka@devjima.com");
    user.setUsername("tanaka_dev");

    setAuthentication("tanaka@devjima.com");
    when(userService.findByEmail("tanaka@devjima.com")).thenReturn(user);

    User result = authUtil.getCurrentUser();

    assertThat(result.getEmail()).isEqualTo("tanaka@devjima.com");
  }
}