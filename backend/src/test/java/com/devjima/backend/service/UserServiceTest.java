package com.devjima.backend.service;

import com.devjima.backend.dto.UserProfileDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.exception.UnauthorizedException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private DTOMapper dtoMapper;

  @InjectMocks
  private UserService userService;

  // =====================
  // registerUser
  // =====================

  @Test
  void ユーザー登録_新規メールアドレスの場合_保存して返す() {
    when(userRepository.findByEmail("new@devjima.com")).thenReturn(Optional.empty());
    when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

    User result = userService.registerUser(
        "newuser", "new@devjima.com", "password123");

    assertThat(result.getUsername()).isEqualTo("newuser");
    assertThat(result.getEmail()).isEqualTo("new@devjima.com");
    verify(userRepository).save(any(User.class));
  }

  @Test
  void ユーザー登録_メールアドレス重複の場合_例外をスロー() {
    User existing = new User();
    existing.setEmail("taken@devjima.com");
    when(userRepository.findByEmail("taken@devjima.com")).thenReturn(Optional.of(existing));

    assertThatThrownBy(() -> userService.registerUser(
        "user", "taken@devjima.com", "password"))
        .isInstanceOf(RuntimeException.class)
        .hasMessageContaining("Email already in use");
  }

  // =====================
  // loginUser
  // =====================

  @Test
  void ログイン_正しい認証情報の場合_ユーザーを返す() {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String hashedPassword = encoder.encode("password123");

    User user = new User();
    user.setEmail("tanaka@devjima.com");
    user.setPassword(hashedPassword);

    when(userRepository.findByEmail("tanaka@devjima.com")).thenReturn(Optional.of(user));

    User result = userService.loginUser("tanaka@devjima.com", "password123");

    assertThat(result.getEmail()).isEqualTo("tanaka@devjima.com");
  }

  @Test
  void ログイン_メールアドレスが存在しない場合_例外をスロー() {
    when(userRepository.findByEmail("unknown@devjima.com")).thenReturn(Optional.empty());

    assertThatThrownBy(() -> userService.loginUser("unknown@devjima.com", "password"))
        .isInstanceOf(RuntimeException.class);
  }

  @Test
  void ログイン_パスワードが間違っている場合_例外をスロー() {
    User user = new User();
    user.setEmail("tanaka@devjima.com");
    user.setPassword("$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa");

    when(userRepository.findByEmail("tanaka@devjima.com")).thenReturn(Optional.of(user));

    assertThatThrownBy(() -> userService.loginUser("tanaka@devjima.com", "wrongpassword"))
        .isInstanceOf(RuntimeException.class)
        .hasMessageContaining("Invalid password");
  }

  // =====================
  // findByEmail
  // =====================

  @Test
  void メール検索_存在するメールの場合_ユーザーを返す() {
    User user = new User();
    user.setEmail("sarah@devjima.com");
    when(userRepository.findByEmail("sarah@devjima.com")).thenReturn(Optional.of(user));

    User result = userService.findByEmail("sarah@devjima.com");

    assertThat(result.getEmail()).isEqualTo("sarah@devjima.com");
  }

  @Test
  void メール検索_存在しないメールの場合_例外をスロー() {
    when(userRepository.findByEmail("ghost@devjima.com")).thenReturn(Optional.empty());

    assertThatThrownBy(() -> userService.findByEmail("ghost@devjima.com"))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // getUserProfile
  // =====================

  @Test
  void プロフィール取得_ユーザーが存在する場合_DTOを返す() {
    User user = new User();
    user.setId(1L);
    UserProfileDTO dto = new UserProfileDTO(1L, "tanaka_dev", "Tanaka", null, null, "ja", null, null, null);

    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(dtoMapper.toUserProfileDTO(user)).thenReturn(dto);

    UserProfileDTO result = userService.getUserProfile(1L);

    assertThat(result.username()).isEqualTo("tanaka_dev");
  }

  @Test
  void プロフィール取得_ユーザーが存在しない場合_例外をスロー() {
    when(userRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> userService.getUserProfile(99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // updateUserProfile
  // =====================

  @Test
  void プロフィール更新_認可済みユーザーの場合_更新して返す() {
    User user = new User();
    user.setId(1L);
    user.setEmail("tanaka@devjima.com");
    UserProfileDTO dto = new UserProfileDTO(1L, "tanaka_dev", "Tanaka Updated", null, null, "ja", null, null, null);

    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(dtoMapper.toUserProfileDTO(user)).thenReturn(dto);

    UserProfileDTO result = userService.updateUserProfile(
        1L, "Tanaka Updated", null, null, "ja", null, "tanaka@devjima.com");

    assertThat(result.displayName()).isEqualTo("Tanaka Updated");
  }

  @Test
  void プロフィール更新_未認可ユーザーの場合_例外をスロー() {
    User user = new User();
    user.setId(1L);
    user.setEmail("tanaka@devjima.com");

    when(userRepository.findById(1L)).thenReturn(Optional.of(user));

    assertThatThrownBy(() -> userService.updateUserProfile(
        1L, "Hacker", null, null, "en", null, "hacker@evil.com"))
        .isInstanceOf(UnauthorizedException.class);
  }

  // =====================
  // getCountryCount / getUserCount
  // =====================

  @Test
  void 国数取得_正しい件数を返す() {
    when(userRepository.countDistinctCountries()).thenReturn(6L);

    assertThat(userService.getCountryCount()).isEqualTo(6L);
  }

  @Test
  void ユーザー数取得_正しい件数を返す() {
    when(userRepository.count()).thenReturn(10L);

    assertThat(userService.getUserCount()).isEqualTo(10L);
  }
}