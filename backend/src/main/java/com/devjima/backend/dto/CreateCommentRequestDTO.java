package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "コメント作成リクエスト")
public record CreateCommentRequestDTO(
    @Schema(description = "コメント本文", example = "とても参考になりました！")
    String body,
    @Schema(description = "言語コード", example = "ja")
    String language
) {}