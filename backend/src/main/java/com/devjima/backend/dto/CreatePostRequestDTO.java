package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "投稿作成リクエスト")
public record CreatePostRequestDTO(
    @Schema(description = "投稿タイトル", example = "Spring Bootで学んだこと")
    String title,
    @Schema(description = "投稿本文（Markdown形式）", example = "## はじめに\nこの記事では...")
    String body,
    @Schema(description = "言語コード", example = "ja")
    String language
) {}