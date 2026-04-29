package com.devjima.backend.repository;

import com.devjima.backend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired
  private UserRepository userRepository;

  @BeforeEach
  void setUp() {
    userRepository.deleteAll();

    User user1 = new User();
    user1.setUsername("tanaka_dev");
    user1.setEmail("tanaka@devjima.com");
    user1.setPassword("hashed_password");
    user1.setCountry("Japan");
    userRepository.save(user1);

    User user2 = new User();
    user2.setUsername("sarah_codes");
    user2.setEmail("sarah@devjima.com");
    user2.setPassword("hashed_password");
    user2.setCountry("Canada");
    userRepository.save(user2);

    User user3 = new User();
    user3.setUsername("mike_in_tokyo");
    user3.setEmail("mike@devjima.com");
    user3.setPassword("hashed_password");
    user3.setCountry("Japan");
    userRepository.save(user3);
  }

  @Test
  void メール検索_存在するメールの場合_ユーザーを返す() {
    Optional<User> result = userRepository.findByEmail("tanaka@devjima.com");

    assertThat(result).isPresent();
    assertThat(result.get().getUsername()).isEqualTo("tanaka_dev");
  }

  @Test
  void メール検索_存在しないメールの場合_空を返す() {
    Optional<User> result = userRepository.findByEmail("ghost@devjima.com");

    assertThat(result).isEmpty();
  }

  @Test
  void ユーザー保存_正しく保存されIDが付与される() {
    User user = new User();
    user.setUsername("new_user");
    user.setEmail("new@devjima.com");
    user.setPassword("hashed_password");

    User saved = userRepository.save(user);

    assertThat(saved.getId()).isNotNull();
    assertThat(saved.getUsername()).isEqualTo("new_user");
  }

  @Test
  void 国数取得_重複を除いた国数を返す() {
    Long count = userRepository.countDistinctCountries();

    assertThat(count).isEqualTo(2L);
  }

  @Test
  void ユーザー数取得_全ユーザー数を返す() {
    Long count = userRepository.count();

    assertThat(count).isEqualTo(3L);
  }
}