package com.devjima.backend.controller;

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

@RestController
@RequestMapping("/api/translate")
public class TranslationController {

  @Value("${deepl.api.key}")
  private String deeplApiKey;

  private final HttpClient httpClient;

  public TranslationController(HttpClient httpClient) {
    this.httpClient = httpClient;
  }

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
