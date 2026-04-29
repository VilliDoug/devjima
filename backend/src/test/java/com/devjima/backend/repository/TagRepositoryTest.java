package com.devjima.backend.repository;

import com.devjima.backend.model.Tag;
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
class TagRepositoryTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired
  private TagRepository tagRepository;

  @BeforeEach
  void setUp() {
    tagRepository.deleteAll();

    Tag tag = new Tag();
    tag.setName("java");
    tag.setSlug("java");
    tagRepository.save(tag);

    Tag tag2 = new Tag();
    tag2.setName("spring");
    tag2.setSlug("spring");
    tagRepository.save(tag2);
  }

  @Test
  void スラッグ検索_存在するスラッグの場合_タグを返す() {
    Optional<Tag> result = tagRepository.findBySlug("java");

    assertThat(result).isPresent();
    assertThat(result.get().getName()).isEqualTo("java");
  }

  @Test
  void スラッグ検索_存在しないスラッグの場合_空を返す() {
    Optional<Tag> result = tagRepository.findBySlug("python");

    assertThat(result).isEmpty();
  }

  @Test
  void タグ保存_正しく保存されIDが付与される() {
    Tag tag = new Tag();
    tag.setName("react");
    tag.setSlug("react");

    Tag saved = tagRepository.save(tag);

    assertThat(saved.getId()).isNotNull();
    assertThat(saved.getName()).isEqualTo("react");
  }

  @Test
  void 全タグ取得_正しい件数を返す() {
    assertThat(tagRepository.findAll()).hasSize(2);
  }
}