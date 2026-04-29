package com.devjima.backend.repository;

import com.devjima.backend.model.Post;
import com.devjima.backend.model.Tag;
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PostRepositoryTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired private PostRepository postRepository;
  @Autowired private UserRepository userRepository;
  @Autowired private TagRepository tagRepository;

  private User user1;
  private User user2;

  @BeforeEach
  void setUp() {
    postRepository.deleteAll();
    tagRepository.deleteAll();
    userRepository.deleteAll();

    user1 = new User();
    user1.setUsername("tanaka_dev");
    user1.setEmail("tanaka@devjima.com");
    user1.setPassword("hashed_password");
    userRepository.save(user1);

    user2 = new User();
    user2.setUsername("sarah_codes");
    user2.setEmail("sarah@devjima.com");
    user2.setPassword("hashed_password");
    userRepository.save(user2);

    Tag javaTag = new Tag();
    javaTag.setName("java");
    javaTag.setSlug("java");
    tagRepository.save(javaTag);

    Post post1 = new Post();
    post1.setTitle("Spring Boot Tips");
    post1.setBody("Body 1");
    post1.setLanguage("en");
    post1.setSlug("spring-boot-tips");
    post1.setAuthor(user1);
    post1.setTags(new HashSet<>(Set.of(javaTag)));
    postRepository.save(post1);

    Post post2 = new Post();
    post2.setTitle("日本のテック文化");
    post2.setBody("Body 2");
    post2.setLanguage("ja");
    post2.setSlug("nihon-no-tech");
    post2.setAuthor(user1);
    post2.setTags(new HashSet<>());
    postRepository.save(post2);

    Post post3 = new Post();
    post3.setTitle("React Best Practices");
    post3.setBody("Body 3");
    post3.setLanguage("en");
    post3.setSlug("react-best-practices");
    post3.setAuthor(user2);
    post3.setTags(new HashSet<>());
    postRepository.save(post3);
  }

  // =====================
  // findByAuthor
  // =====================

  @Test
  void 著者別投稿取得_正しい投稿を返す() {
    List<Post> result = postRepository.findByAuthor(user1);

    assertThat(result).hasSize(2);
    assertThat(result).allMatch(p -> p.getAuthor().getEmail().equals("tanaka@devjima.com"));
  }

  @Test
  void 著者別投稿取得_投稿がない著者の場合_空リストを返す() {
    List<Post> result = postRepository.findByAuthor(user2);

    assertThat(result).hasSize(1);
    assertThat(result.get(0).getTitle()).isEqualTo("React Best Practices");
  }

  // =====================
  // findByLanguage
  // =====================

  @Test
  void 言語別投稿取得_英語投稿を返す() {
    List<Post> result = postRepository.findByLanguage("en");

    assertThat(result).hasSize(2);
    assertThat(result).allMatch(p -> p.getLanguage().equals("en"));
  }

  @Test
  void 言語別投稿取得_日本語投稿を返す() {
    List<Post> result = postRepository.findByLanguage("ja");

    assertThat(result).hasSize(1);
    assertThat(result.get(0).getTitle()).isEqualTo("日本のテック文化");
  }

  // =====================
  // findByTitleContainingIgnoreCase
  // =====================

  @Test
  void タイトル検索_大文字小文字無視_正しい投稿を返す() {
    List<Post> result = postRepository.findByTitleContainingIgnoreCase("spring");

    assertThat(result).hasSize(1);
    assertThat(result.get(0).getTitle()).isEqualTo("Spring Boot Tips");
  }

  @Test
  void タイトル検索_存在しないキーワードの場合_空リストを返す() {
    List<Post> result = postRepository.findByTitleContainingIgnoreCase("python");

    assertThat(result).isEmpty();
  }

  // =====================
  // findByTitleContainingIgnoreCaseAndLanguage
  // =====================

  @Test
  void タイトルと言語で検索_正しい投稿を返す() {
    List<Post> result = postRepository
        .findByTitleContainingIgnoreCaseAndLanguage("react", "en");

    assertThat(result).hasSize(1);
    assertThat(result.get(0).getTitle()).isEqualTo("React Best Practices");
  }

  @Test
  void タイトルと言語で検索_一致しない場合_空リストを返す() {
    List<Post> result = postRepository
        .findByTitleContainingIgnoreCaseAndLanguage("spring", "ja");

    assertThat(result).isEmpty();
  }

  // =====================
  // findByTagsSlug
  // =====================

  @Test
  void タグ別投稿取得_正しい投稿を返す() {
    List<Post> result = postRepository.findByTagsSlug("java");

    assertThat(result).hasSize(1);
    assertThat(result.get(0).getTitle()).isEqualTo("Spring Boot Tips");
  }

  @Test
  void タグ別投稿取得_存在しないタグの場合_空リストを返す() {
    List<Post> result = postRepository.findByTagsSlug("python");

    assertThat(result).isEmpty();
  }

  // =====================
  // findAllByOrderByCreatedAtDesc
  // =====================

  @Test
  void 最新順投稿取得_正しい順序で返す() {
    List<Post> result = postRepository.findAllByOrderByCreatedAtDesc();

    assertThat(result).hasSize(3);
    // Most recently saved post should be first
    assertThat(result.get(0).getTitle()).isEqualTo("React Best Practices");
  }
}