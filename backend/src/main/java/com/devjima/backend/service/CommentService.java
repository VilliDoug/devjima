package com.devjima.backend.service;

import com.devjima.backend.dto.CommentResponseDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.Comment;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.CommentRepository;
import com.devjima.backend.repository.PostRepository;
import com.devjima.backend.repository.UserRepository;
import java.util.List;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

  private final CommentRepository commentRepository;
  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final DTOMapper dtoMapper;

  public CommentService(
      CommentRepository commentRepository,
      PostRepository postRepository,
      UserRepository userRepository,
      DTOMapper dtoMapper) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.dtoMapper = dtoMapper;
  }

  public CommentResponseDTO addComment(
      Long postId, String body, String language, Long authorId) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
    User author = userRepository.findById(authorId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    Comment comment = new Comment();
    comment.setPost(post);
    comment.setBody(body);
    comment.setLanguage(language);
    comment.setAuthor(author);

    commentRepository.save(comment);

    return dtoMapper.toCommentResponseDTO(comment);
  }

  public CommentResponseDTO addReply(
      Long parentCommentId, String body, String language, Long authorId) {
    Comment parentComment = commentRepository.findById(parentCommentId)
        .orElseThrow(() -> new ResourceNotFoundException("Parent comment not found"));
    User author = userRepository.findById(authorId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    Post post = parentComment.getPost();
    Comment reply = new Comment();
    reply.setPost(post);
    reply.setParentComment(parentComment);
    reply.setBody(body);
    reply.setLanguage(language);
    reply.setAuthor(author);

    commentRepository.save(reply);

    return dtoMapper.toCommentResponseDTO(reply);
  }

  public List<CommentResponseDTO> getCommentsByPost(Long postId) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
    return commentRepository.findByPostAndParentCommentIsNull(post)
        .stream()
        .map(dtoMapper::toCommentResponseDTO)
        .toList();
  }

}
