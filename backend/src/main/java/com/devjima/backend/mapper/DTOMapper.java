package com.devjima.backend.mapper;

import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.Tag;
import com.devjima.backend.model.User;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class DTOMapper {

  public AuthorDTO toAuthorDTO(User author) {
    return new AuthorDTO(
        author.getId(),
        author.getUsername(),
        author.getDisplayName(),
        author.getAvatarUrl());
  }

  public PostResponseDTO toPostResponseDTO(Post post) {
    AuthorDTO authorDTO = post.getAuthor() != null
        ? toAuthorDTO(post.getAuthor())
        : null;
    List<TagDTO> tags = post.getTags().stream().map(this::toTagDTO).toList();

    return new PostResponseDTO(
        post.getId(),
        post.getTitle(),
        post.getSlug(),
        post.getBody(),
        post.getLanguage(),
        post.getPublished(),
        post.getViewCount(),
        post.getCreatedAt(),
        authorDTO,
        tags
        );
  }

  public TagDTO toTagDTO(Tag tag) {
    return new TagDTO(
        tag.getId(),
        tag.getName(),
        tag.getSlug()
    );
  }
}
