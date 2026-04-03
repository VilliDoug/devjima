package com.devjima.backend.service;

import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.PostRepository;
import com.devjima.backend.repository.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PostService {

  private final UserRepository userRepository;
  private final PostRepository postRepository;
  private final DTOMapper dtoMapper;

  public PostService(
      UserRepository userRepository,
      PostRepository postRepository,
      DTOMapper dtoMapper) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.dtoMapper = dtoMapper;
  }

  public Post createPost(String title, String body, String language, Long authorId) {
    User user = userRepository.findById(authorId)
        .orElseThrow(() -> new ResourceNotFoundException("Post author not found"));

//    TODO: add regex to avoid having symbols in slug
    String slug = title.toLowerCase().replace(" ", "-");
    Post post = new Post();
    post.setAuthor(user);
    post.setTitle(title);
    post.setBody(body);
    post.setLanguage(language);
    post.setSlug(slug);
    return postRepository.save(post);
  }

  public List<PostResponseDTO> getAllPosts() {
    List<Post> posts = postRepository.findAll();
    return posts.stream()
        .map(dtoMapper::toPostResponseDTO)
        .toList();
  }

  public PostResponseDTO getPostById(Long id) {
    Post post = postRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
    return dtoMapper.toPostResponseDTO(post);
  }

  public List<PostResponseDTO> getPostsByAuthor(Long authorId) {
    User author = userRepository.findById(authorId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    List<Post> posts = postRepository.findByAuthor(author);
    return posts.stream()
        .map(dtoMapper::toPostResponseDTO)
        .toList();
  }
}
