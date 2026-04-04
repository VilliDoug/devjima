package com.devjima.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public record PostResponseDTO(
    Long id,
    String title,
    String slug,
    String body,
    String language,
    Boolean published,
    Integer viewCount,
    LocalDateTime createdAt,
    AuthorDTO author,
    List<TagDTO> tags
) {}
