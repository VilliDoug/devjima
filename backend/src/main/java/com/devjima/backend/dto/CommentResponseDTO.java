package com.devjima.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "コメントレスポンス")
public record CommentResponseDTO(
    @Schema(description = "コメントID", example = "1")
    Long id,
    @Schema(description = "コメント本文（Markdown形式）", example = "とても参考になりました！")
    String body,
    @Schema(description = "コメント本文（HTML形式）", example = "<p>とても参考になりました！</p>")
    String bodyHtml,
    @Schema(description = "言語コード", example = "ja")
    String language,
    @Schema(description = "作成日時")
    LocalDateTime createdAt,
    @Schema(description = "削除フラグ（論理削除）", example = "false")
    Boolean deleted,
    @Schema(description = "コメント著者情報")
    AuthorDTO author,
    @Schema(description = "返信コメント一覧")
    List<CommentResponseDTO> replies
) {}