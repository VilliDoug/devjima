package com.devjima.backend.mapper;

import com.devjima.backend.dto.AuthorDTO;
import com.devjima.backend.dto.CommentResponseDTO;
import com.devjima.backend.dto.PostResponseDTO;
import com.devjima.backend.dto.TagDTO;
import com.devjima.backend.dto.UserProfileDTO;
import com.devjima.backend.model.Comment;
import com.devjima.backend.model.Post;
import com.devjima.backend.model.Tag;
import com.devjima.backend.model.User;
import java.util.List;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Component;

@Component
public class DTOMapper {

  private final Parser parser = Parser.builder().build();
  private final HtmlRenderer renderer = HtmlRenderer.builder().build();

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

//    CommonMark "flow" - parse the body into a Node
    Node parsedBody = parser.parse(post.getBody());
//    Render the Node into an HTML String
    String bodyHtml = renderer.render(parsedBody);

    return new PostResponseDTO(
        post.getId(),
        post.getTitle(),
        post.getSlug(),
        post.getBody(), // raw markdown
        bodyHtml, // rendered html body
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

  public CommentResponseDTO toCommentResponseDTO(Comment comment) {
    AuthorDTO authorDTO = comment.getAuthor() != null
        ? toAuthorDTO(comment.getAuthor())
        : null;

    Node parsedBody = parser.parse(comment.getBody());
    String bodyHtml = renderer.render(parsedBody);

    return new CommentResponseDTO(
        comment.getId(),
        comment.getBody(),
        bodyHtml,
        comment.getLanguage(),
        comment.getCreatedAt(),
        comment.getDeleted(),
        authorDTO,
//        this calls itself(method), so the recursion works.
        comment.getReplies().stream()
            .map(this::toCommentResponseDTO)
            .toList()
    );
  }

  public UserProfileDTO toUserProfileDTO(User user) {
    return new UserProfileDTO(
        user.getId(),
        user.getUsername(),
        user.getDisplayName(),
        user.getBio(),
        user.getAvatarUrl(),
        user.getPreferredLang(),
        user.getRole(),
        user.getCreatedAt()
    );
  }
}
