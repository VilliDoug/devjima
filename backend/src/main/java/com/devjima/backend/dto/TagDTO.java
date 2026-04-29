package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "タグ情報")
public record TagDTO(
    @Schema(description = "タグID", example = "1")
    Long id,
    @Schema(description = "タグ名", example = "java")
    String name,
    @Schema(description = "URLスラッグ", example = "java")
    String slug
) {}