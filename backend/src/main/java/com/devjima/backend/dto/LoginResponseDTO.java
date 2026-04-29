package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "ログインレスポンス")
public record LoginResponseDTO(
    @Schema(description = "JWTアクセストークン", example = "eyJhbGciOiJIUzI1NiJ9...")
    String token,
    @Schema(description = "ユーザーID", example = "1")
    Long userId,
    @Schema(description = "ユーザー名", example = "tanaka_dev")
    String username
) {}