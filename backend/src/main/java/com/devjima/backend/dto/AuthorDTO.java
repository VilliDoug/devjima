package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "投稿・コメントの著者情報")
public record AuthorDTO(
    @Schema(description = "ユーザーID", example = "1")
    Long id,
    @Schema(description = "ユーザー名", example = "tanaka_dev")
    String username,
    @Schema(description = "表示名", example = "田中 開発太郎")
    String displayName,
    @Schema(description = "アバター画像URL", example = "https://example.com/avatar.png")
    String avatarUrl
) {}