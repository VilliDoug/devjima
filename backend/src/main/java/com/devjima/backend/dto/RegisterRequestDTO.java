package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "ユーザー登録リクエスト")
public record RegisterRequestDTO(
    @Schema(description = "ユーザー名", example = "tanaka_dev")
    String username,
    @Schema(description = "メールアドレス", example = "tanaka@devjima.com")
    String email,
    @Schema(description = "パスワード", example = "password123")
    String password
) {}