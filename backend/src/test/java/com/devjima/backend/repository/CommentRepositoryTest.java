package com.devjima.backend.repository;

import com.devjima.backend.model.Comment;
import com.devjima.backend.model.Post;
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

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CommentRepositoryTest {

  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Autowired private CommentRepository commentRepository;
  @Autowired private PostRepository postRepository;
  @Autowired private UserRepository userRepository;

  private Post post;
  private User user;

  @BeforeEach
  void setUp() {
    commentRepository.deleteAll();
    postRepository.deleteAll();
    userRepository.deleteAll();

    user = new User();
    user.setUsername("tanaka_dev");
    user.setEmail("tanaka@devjima.com");
    user.setPassword("hashed_password");
    userRepository.save(user);

    post = new Post();
    post.setTitle("Test Post");
    post.setBody("Test body");
    post.setLanguage("en");
    post.setSlug("test-post");
    post.setAuthor(user);
    post.setTags(new HashSet<>());
    postRepository.save(post);

    // Top level comment
    Comment comment1 = new Comment();
    comment1.setBody("Top level comment 1");
    comment1.setLanguage("en");
    comment1.setAuthor(user);
    comment1.setPost(post);
    comment1.setDeleted(false);
    commentRepository.save(comment1);

    // Top level comment 2
    Comment comment2 = new Comment();
    comment2.setBody("Top level comment 2");
    comment2.setLanguage("en");
    comment2.setAuthor(user);
    comment2.setPost(post);
    comment2.setDeleted(false);
    commentRepository.save(comment2);

    // Reply to comment1
    Comment reply = new Comment();
    reply.setBody("Reply to comment 1");
    reply.setLanguage("en");
    reply.setAuthor(user);
    reply.setPost(post);
    reply.setParentComment(comment1);
    reply.setDeleted(false);
    commentRepository.save(reply);
  }

  // =====================
  // findByPostAndParentCommentIsNull
  // =====================

  @Test
  void 投稿別トップレベルコメント取得_返信を除いた件数を返す() {
    List<Comment> result = commentRepository.findByPostAndParentCommentIsNull(post);

    assertThat(result).hasSize(2);
  }

  @Test
  void 投稿別トップレベルコメント取得_返信が含まれていない() {
    List<Comment> result = commentRepository.findByPostAndParentCommentIsNull(post);

    assertThat(result).allMatch(c -> c.getParentComment() == null);
  }

  // =====================
  // findByParentComment
  // =====================

  @Test
  void 親コメント別返信取得_正しい返信を返す() {
    Comment parent = commentRepository.findByPostAndParentCommentIsNull(post).get(0);
    List<Comment> replies = commentRepository.findByParentComment(parent);

    assertThat(replies).hasSize(1);
    assertThat(replies.get(0).getBody()).isEqualTo("Reply to comment 1");
  }

  @Test
  void 親コメント別返信取得_返信がない場合_空リストを返す() {
    Comment parent = commentRepository.findByPostAndParentCommentIsNull(post).get(1);
    List<Comment> replies = commentRepository.findByParentComment(parent);

    assertThat(replies).isEmpty();
  }
}