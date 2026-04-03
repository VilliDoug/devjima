package com.devjima.backend.dto;

public record AuthorDTO(
    Long id,
    String username,
    String displayName,
    String avatarUrl
) {}
