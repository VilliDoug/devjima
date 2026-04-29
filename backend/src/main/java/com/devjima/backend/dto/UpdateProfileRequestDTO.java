package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "プロフィール更新リクエスト")
public record UpdateProfileRequestDTO(
    @Schema(description = "表示名", example = "田中 開発太郎")
    String displayName,
    @Schema(description = "自己紹介文", example = "Spring BootとReactが好きな開発者です")
    String bio,
    @Schema(description = "アバター画像URL", example = "https://example.com/avatar.png")
    String avatarUrl,
    @Schema(description = "使用言語コード", example = "ja")
    String preferredLang,
    @Schema(description = "出身国", example = "Japan")
    String country
) {}