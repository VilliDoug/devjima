package com.devjima.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Tag(name = "翻訳", description = "DeepL APIを使用した翻訳エンドポイント")
@RestController
@RequestMapping("/api/translate")
public class TranslationController {

  @Value("${deepl.api.key}")
  private String deeplApiKey;

  private final HttpClient httpClient;

  public TranslationController(HttpClient httpClient) {
    this.httpClient = httpClient;
  }

  @Operation(summary = "テキストを翻訳", description = "DeepL APIを使用してHTMLコンテンツを翻訳する。コードブロックは翻訳対象外")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "翻訳成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "500", description = "DeepL APIエラー")
  })
  @SecurityRequirement(name = "bearerAuth")
  @PostMapping
  public ResponseEntity<Map<String, String>> translate(
      @RequestBody Map<String, String> request) throws Exception {

    String text = request.get("text");
    String targetLang = request.get("targetLang");

    ObjectMapper mapper = new ObjectMapper();

    Map<String, Object> deeplRequest = new java.util.HashMap<>();
    deeplRequest.put("text", new String[]{text});
    deeplRequest.put("target_lang", targetLang);
    deeplRequest.put("tag_handling", "html");
    deeplRequest.put("ignore_tags", new String[]{"code", "pre"});

    String requestBody = mapper.writeValueAsString(deeplRequest);

    HttpRequest httpRequest = HttpRequest.newBuilder()
        .uri(URI.create("https://api-free.deepl.com/v2/translate"))
        .header("Authorization", "DeepL-Auth-Key " + deeplApiKey)
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
        .build();

    HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

    JsonNode root = mapper.readTree(response.body());
    String translatedText = root.path("translations").get(0).path("text").asText();

    return ResponseEntity.ok(Map.of("translatedText", translatedText));
  }


}
