package com.devjima.backend.service;

import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.Tag;
import com.devjima.backend.repository.PostRepository;
import com.devjima.backend.repository.TagRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TagService {

  private TagRepository tagRepository;
  private PostRepository postRepository;
  private DTOMapper dtoMapper;

  public TagService(
      TagRepository tagRepository,
      PostRepository postRepository,
      DTOMapper dtoMapper){
    this.tagRepository = tagRepository;
    this.postRepository = postRepository;
    this.dtoMapper = dtoMapper;
  }

  @Transactional(readOnly = true)
  public List<TagDTO> getAllTags() {
    List<Tag> tags = tagRepository.findAll();
    return tags.stream()
        .map(dtoMapper::toTagDTO)
        .toList();
  }

  @Transactional
  public PostResponseDTO addTagToPost(Long postId, Long tagId) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
    Tag tag = tagRepository.findById(tagId)
        .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));

    if (!post.getTags().contains(tag)) {
      post.getTags().add(tag);
      postRepository.save(post);
    }
    return dtoMapper.toPostResponseDTO(post);
  }

  @Transactional
  public void deleteTagFromPost(Long tagId, Long postId) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
    Tag tag = tagRepository.findById(tagId)
        .orElseThrow(() -> new ResourceNotFoundException("Tag not found"));
    post.getTags().remove(tag);
    postRepository.save(post);
  }

}
