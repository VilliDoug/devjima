package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "投稿レスポンス")
public record PostResponseDTO(
    @Schema(description = "投稿ID", example = "1")
    Long id,
    @Schema(description = "投稿タイトル", example = "Spring Bootで学んだこと")
    String title,
    @Schema(description = "URLスラッグ", example = "spring-boot-de-mananda-koto")
    String slug,
    @Schema(description = "投稿本文（Markdown形式）", example = "## はじめに\nこの記事では...")
    String body,
    @Schema(description = "投稿本文（HTML形式）", example = "<h2>はじめに</h2><p>この記事では...</p>")
    String bodyHtml,
    @Schema(description = "言語コード", example = "ja")
    String language,
    @Schema(description = "公開フラグ", example = "true")
    Boolean published,
    @Schema(description = "閲覧数", example = "42")
    Integer viewCount,
    @Schema(description = "作成日時")
    LocalDateTime createdAt,
    @Schema(description = "著者情報")
    AuthorDTO author,
    @Schema(description = "タグ一覧")
    List<TagDTO> tags
) {}