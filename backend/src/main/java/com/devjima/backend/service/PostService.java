package com.devjima.backend.service;

import com.devjima.backend.model.Post;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.PostRepository;
import com.devjima.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class PostService {

  private final UserRepository userRepository;
  private final PostRepository postRepository;

  public PostService(UserRepository userRepository, PostRepository postRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  public Post createPost(String title, String body, String language, Long authorId) {
    User user = userRepository.findById(authorId).orElseThrow(
        () -> new RuntimeException("Post author not found"));

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

}
