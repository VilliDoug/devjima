package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "ログインリクエスト")
public record LoginRequestDTO(
    @Schema(description = "メールアドレス", example = "tanaka@devjima.com")
    String email,
    @Schema(description = "パスワード", example = "password123")
    String password
) {}