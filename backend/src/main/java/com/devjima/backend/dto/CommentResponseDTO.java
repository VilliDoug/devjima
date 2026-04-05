package com.devjima.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CommentResponseDTO(
    Long id,
    String body,
    String bodyHtml,
    String language,
    LocalDateTime createdAt,
    Boolean deleted,
    AuthorDTO author,
    List<CommentResponseDTO> replies
) {}
