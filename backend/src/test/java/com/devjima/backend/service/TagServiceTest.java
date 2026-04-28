package com.devjima.backend.service;

import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.Tag;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.PostRepository;
import com.devjima.backend.repository.TagRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TagServiceTest {

  @Mock private TagRepository tagRepository;
  @Mock private PostRepository postRepository;
  @Mock private DTOMapper dtoMapper;

  @InjectMocks
  private TagService tagService;

  // =====================
  // Helpers
  // =====================

  private Tag mockTag(Long id, String name) {
    Tag tag = new Tag();
    tag.setId(id);
    tag.setName(name);
    tag.setSlug(name.toLowerCase());
    return tag;
  }

  private Post mockPost(Long id) {
    User user = new User();
    user.setId(1L);
    user.setEmail("tanaka@devjima.com");
    Post post = new Post();
    post.setId(id);
    post.setTitle("Test Post");
    post.setTags(new HashSet<>());
    post.setAuthor(user);
    return post;
  }

  private PostResponseDTO mockPostDTO(Long id) {
    return new PostResponseDTO(id, "Test Post", "test-post", "Body", "<p>Body</p>",
        "en", true, 0, null,
        new AuthorDTO(1L, "testuser", "Test User", null), List.of());
  }

  // =====================
  // getAllTags
  // =====================

  @Test
  void 全タグ取得_タグが存在する場合_リストを返す() {
    Tag tag = mockTag(1L, "java");
    TagDTO dto = new TagDTO(1L, "java", "java");

    when(tagRepository.findAll()).thenReturn(List.of(tag));
    when(dtoMapper.toTagDTO(tag)).thenReturn(dto);

    List<TagDTO> result = tagService.getAllTags();

    assertThat(result).hasSize(1);
    assertThat(result.get(0).name()).isEqualTo("java");
  }

  @Test
  void 全タグ取得_タグが存在しない場合_空リストを返す() {
    when(tagRepository.findAll()).thenReturn(List.of());

    List<TagDTO> result = tagService.getAllTags();

    assertThat(result).isEmpty();
  }

  // =====================
  // addTagToPost
  // =====================

  @Test
  void 投稿にタグ追加_正常な場合_DTOを返す() {
    Post post = mockPost(1L);
    Tag tag = mockTag(1L, "java");
    PostResponseDTO dto = mockPostDTO(1L);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    PostResponseDTO result = tagService.addTagToPost(1L, 1L);

    assertThat(result.id()).isEqualTo(1L);
    verify(postRepository).save(post);
  }

  @Test
  void 投稿にタグ追加_投稿が存在しない場合_例外をスロー() {
    when(postRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> tagService.addTagToPost(99L, 1L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  @Test
  void 投稿にタグ追加_タグが存在しない場合_例外をスロー() {
    Post post = mockPost(1L);
    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(tagRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> tagService.addTagToPost(1L, 99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  @Test
  void 投稿にタグ追加_既に追加済みの場合_保存しない() {
    Post post = mockPost(1L);
    Tag tag = mockTag(1L, "java");
    post.getTags().add(tag);
    PostResponseDTO dto = mockPostDTO(1L);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));
    when(dtoMapper.toPostResponseDTO(post)).thenReturn(dto);

    tagService.addTagToPost(1L, 1L);

    verify(postRepository, org.mockito.Mockito.never()).save(post);
  }

  // =====================
  // deleteTagFromPost
  // =====================

  @Test
  void 投稿からタグ削除_正常な場合_削除される() {
    Post post = mockPost(1L);
    Tag tag = mockTag(1L, "java");
    post.getTags().add(tag);

    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(tagRepository.findById(1L)).thenReturn(Optional.of(tag));

    tagService.deleteTagFromPost(1L, 1L);

    verify(postRepository).save(post);
  }

  @Test
  void 投稿からタグ削除_投稿が存在しない場合_例外をスロー() {
    when(postRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> tagService.deleteTagFromPost(1L, 99L))
        .isInstanceOf(ResourceNotFoundException.class);
  }

  @Test
  void 投稿からタグ削除_タグが存在しない場合_例外をスロー() {
    Post post = mockPost(1L);
    when(postRepository.findById(1L)).thenReturn(Optional.of(post));
    when(tagRepository.findById(99L)).thenReturn(Optional.empty());

    assertThatThrownBy(() -> tagService.deleteTagFromPost(99L, 1L))
        .isInstanceOf(ResourceNotFoundException.class);
  }
}