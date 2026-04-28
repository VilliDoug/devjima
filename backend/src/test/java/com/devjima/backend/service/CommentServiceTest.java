package com.devjima.backend.service;

import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.dto.CommentResponseDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.exception.UnauthorizedException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.Comment;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.CommentRepository;
import com.devjima.backend.repository.PostRepository;
import com.devjima.backend.repository.UserRepository;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

  @Mock private CommentRepository commentRepository;
  @Mock private PostRepository postRepository;
  @Mock private UserRepository userRepository;
  @Mock private DTOMapper dtoMapper;

  @InjectMocks
  private CommentService commentService;

  // =====================
  // Helpers
  // =====================

  private User mockUser(Long id, String email) {
    User user = new User();
    user.setId(id);
    user.setUsername("testuser");
    user.setEmail(email);
    return user;
  }

  private Post mockPost(Long id) {
    Post post = new Post();
    post.setId(id);
    post.setTitle("Test Post");
    return post;
  }

  private Comment mockComment(Long id, User author, Post post) {
    Comment comment = new Comment();
    comment.setId(id);
    comment.setBody("Test comment");
    comment.setLanguage("en");
    comment.setAuthor(author);
    comment.setPost(post);
    comment.setDeleted(false);
    return comment;
  }

  private CommentResponseDTO mockDTO(Long id) {
    return new CommentResponseDTO(id, "Test comment", "<p>Test comment</p>",
        "en", null, null,
        new AuthorDTO(1L, "testuser", "Test User", null), List.of());
  }

  // =====================
  // addComment
  // =====================

  @Test
  void コメント追加_正常な場合_DTOを返す() {
    Post post = mockPost(1L);
    User user = mockUser(1L, "tanaka@devjima.com");
    Comment comment = mockComment(1L, user, post);
    CommentResponseDTO dto = mockDTO(1L);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(commentRepository.save(any(Comment.class))).thenReturn(comment);
    when(dtoMapper.toCommentResponseDTO(any(Comment.class))).thenReturn(dto);

    CommentResponseDTO result = commentService.addComment(1L, "Test comment", "en", 1L);

    assertThat(result.id()).isEqualTo(1L);
    verify(commentRepository).save(any(Comment.class));
  }

  @Test
  void コメント追加_投稿が存在しない場合_例外をスロー() {
    when(postRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> commentService.addComment(99L, "Body", "en", 1L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  @Test
  void コメント追加_ユーザーが存在しない場合_例外をスロー() {
    Post post = mockPost(1L);
    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(userRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> commentService.addComment(1L, "Body", "en", 99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // addReply
  // =====================

  @Test
  void 返信追加_正常な場合_DTOを返す() {
    Post post = mockPost(1L);
    User user = mockUser(1L, "tanaka@devjima.com");
    Comment parent = mockComment(1L, user, post);
    Comment reply = mockComment(2L, user, post);
    CommentResponseDTO dto = mockDTO(2L);

    when(commentRepository.findById(1L)).thenReturn(Optional.of(parent));
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    when(commentRepository.save(any(Comment.class))).thenReturn(reply);
    when(dtoMapper.toCommentResponseDTO(any(Comment.class))).thenReturn(dto);

    CommentResponseDTO result = commentService.addReply(1L, "Reply body", "en", 1L);

    assertThat(result.id()).isEqualTo(2L);
    verify(commentRepository).save(any(Comment.class));
  }

  @Test
  void 返信追加_親コメントが存在しない場合_例外をスロー() {
    when(commentRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> commentService.addReply(99L, "Body", "en", 1L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // getCommentsByPost
  // =====================

  @Test
  void 投稿別コメント取得_正常な場合_リストを返す() {
    Post post = mockPost(1L);
    User user = mockUser(1L, "tanaka@devjima.com");
    Comment comment = mockComment(1L, user, post);
    CommentResponseDTO dto = mockDTO(1L);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(commentRepository.findByPostAndParentCommentIsNull(post)).thenReturn(List.of(comment));
    when(dtoMapper.toCommentResponseDTO(comment)).thenReturn(dto);

    List<CommentResponseDTO> result = commentService.getCommentsByPost(1L);

    assertThat(result).hasSize(1);
  }

  @Test
  void 投稿別コメント取得_投稿が存在しない場合_例外をスロー() {
    when(postRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> commentService.getCommentsByPost(99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  // =====================
  // deleteComment
  // =====================

  @Test
  void コメント削除_認可済みユーザーの場合_削除フラグを立てる() {
    User user = mockUser(1L, "tanaka@devjima.com");
    Post post = mockPost(1L);
    Comment comment = mockComment(1L, user, post);

    when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
    when(userRepository.findByEmail("tanaka@devjima.com")).thenReturn(Optional.of(user));

    commentService.deleteComment(1L, "tanaka@devjima.com");

    assertThat(comment.getDeleted()).isTrue();
    verify(commentRepository).save(comment);
  }

  @Test
  void コメント削除_未認可ユーザーの場合_例外をスロー() {
    User owner = mockUser(1L, "tanaka@devjima.com");
    User hacker = mockUser(2L, "hacker@evil.com");
    Post post = mockPost(1L);
    Comment comment = mockComment(1L, owner, post);

    when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
    when(userRepository.findByEmail("hacker@evil.com")).thenReturn(Optional.of(hacker));

    assertThatThrownBy(() -> commentService.deleteComment(1L, "hacker@evil.com"))
        .isInstanceOf(UnauthorizedException.class);
  }

  @Test
  void コメント削除_コメントが存在しない場合_例外をスロー() {
    when(commentRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> commentService.deleteComment(99L, "tanaka@devjima.com"))
        .isInstanceOf(ResourceNotFoundException.class);
  }
}