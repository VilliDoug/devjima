package com.devjima.backend.service;

import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.exception.UnauthorizedException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.PostRepository;
import com.devjima.backend.repository.UserRepository;
import com.devjima.backend.util.SlugUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

  @Mock private UserRepository userRepository;
  @Mock private PostRepository postRepository;
  @Mock private DTOMapper dtoMapper;
  @Mock private SlugUtil slugUtil;

  @InjectMocks
  private PostService postService;

  // =====================
  // Helper
  // =====================

  private User mockUser(Long id, String email) {
    User user = new User();
    user.setId(id);
    user.setUsername("testuser");
    user.setEmail(email);
    return user;
  }

  private Post mockPost(Long id, User author) {
    Post post = new Post();
    post.setId(id);
    post.setTitle("Test Post");
    post.setBody("Test body");
    post.setLanguage("en");
    post.setSlug("test-post");
    post.setAuthor(author);
    return post;
  }

  private PostResponseDTO mockDTO(Long id, String title) {
    return new PostResponseDTO(id, title, "test-post", "Test body", "<p>Test body</p>",
        "en", true, 0, null,
        new AuthorDTO(1L, "testuser", "Test User", null), List.of());
  }

  // =====================
  // createPost
  // =====================

  @Test
  void 投稿作成_正常な場合_DTOを返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(slugUtil.generateSlug("Test Post")).thenReturn("test-post");
    when(postRepository.save(any(Post.class))).thenReturn(post);
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    PostResponseDTO result = postService.createPost("Test Post", "Test body", "en", 1L);

    assertThat(result.title()).isEqualTo("Test Post");
    verify(postRepository).save(any(Post.class));
  }

  @Test
  void 投稿作成_著者が存在しない場合_例外をスロー() {
    when(userRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.createPost("Title", "Body", "en", 99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // getPostById
  // =====================

  @Test
  void 投稿取得_存在するIDの場合_DTOを返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    PostResponseDTO result = postService.getPostById(1L);

    assertThat(result.id()).isEqualTo(1L);
  }

  @Test
  void 投稿取得_存在しないIDの場合_例外をスロー() {
    when(postRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.getPostById(99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // getAllPosts
  // =====================

  @Test
  void 全投稿取得_投稿が存在する場合_リストを返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(postRepository.findAll()).thenReturn(List.of(post));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    List<PostResponseDTO> result = postService.getAllPosts();

    assertThat(result).hasSize(1);
  }

  @Test
  void 全投稿取得_投稿が存在しない場合_空リストを返す() {
    when(postRepository.findAll()).thenReturn(List.of());

    List<PostResponseDTO> result = postService.getAllPosts();

    assertThat(result).isEmpty();
  }

  // =====================
  // getPostsByAuthor
  // =====================

  @Test
  void 著者別投稿取得_著者が存在する場合_リストを返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(postRepository.findByAuthor(user)).thenReturn(List.of(post));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    List<PostResponseDTO> result = postService.getPostsByAuthor(1L);

    assertThat(result).hasSize(1);
  }

  @Test
  void 著者別投稿取得_著者が存在しない場合_例外をスロー() {
    when(userRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.getPostsByAuthor(99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // updatePost
  // =====================

  @Test
  void 投稿更新_認可済みユーザーの場合_更新して返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Updated Title");

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(slugUtil.generateSlug("Updated Title")).thenReturn("updated-title");
    when(postRepository.save(post)).thenReturn(post);
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    PostResponseDTO result = postService.updatePost(
        1L, "Updated Title", "Updated body", "en", "tanaka@devjima.com");

    assertThat(result.title()).isEqualTo("Updated Title");
  }

  @Test
  void 投稿更新_未認可ユーザーの場合_例外をスロー() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));

    assertThatThrownBy(() -> postService.updatePost(
        1L, "Title", "Body", "en", "hacker@evil.com"))
        .isInstanceOf(UnauthorizedException.class);
  }

  @Test
  void 投稿更新_存在しない投稿の場合_例外をスロー() {
    when(postRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.updatePost(
        99L, "Title", "Body", "en", "tanaka@devjima.com"))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // deletePost
  // =====================

  @Test
  void 投稿削除_認可済みユーザーの場合_削除される() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));

    postService.deletePost(1L, "tanaka@devjima.com");

    verify(postRepository).delete(post);
  }

  @Test
  void 投稿削除_未認可ユーザーの場合_例外をスロー() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));

    assertThatThrownBy(() -> postService.deletePost(1L, "hacker@evil.com"))
        .isInstanceOf(UnauthorizedException.class);
  }

  @Test
  void 投稿削除_存在しない投稿の場合_例外をスロー() {
    when(postRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.deletePost(99L, "tanaka@devjima.com"))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // searchPosts
  // =====================

  @Test
  void 投稿検索_タイトルと言語で検索_リストを返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(postRepository.findByTitleContainingIgnoreCaseAndLanguage("Test", "en"))
        .thenReturn(List.of(post));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    List<PostResponseDTO> result = postService.searchPosts("Test", "en");

    assertThat(result).hasSize(1);
  }

  @Test
  void 投稿検索_条件なしの場合_全投稿を返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(postRepository.findAll()).thenReturn(List.of(post));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    List<PostResponseDTO> result = postService.searchPosts("", "");

    assertThat(result).hasSize(1);
  }

  // =====================
  // getPostCount
  // =====================

  @Test
  void 投稿数取得_正しい件数を返す() {
    when(postRepository.count()).thenReturn(50L);

    assertThat(postService.getPostCount()).isEqualTo(50L);
  }

  // =====================
  // getPostsSortedByRecent
  // =====================

  @Test
  void 最新投稿取得_正しい順序で返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(postRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(post));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    List<PostResponseDTO> result = postService.getPostsSortedByRecent();

    assertThat(result).hasSize(1);
  }

  // =====================
  // getPostsByTag
  // =====================

  @Test
  void タグ別投稿取得_正しいリストを返す() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L, user);
    PostResponseDTO dto = mockDTO(1L, "Test Post");

    when(postRepository.findByTagsSlug("java")).thenReturn(List.of(post));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    List<PostResponseDTO> result = postService.getPostsByTag("java");

    assertThat(result).hasSize(1);
  }
}