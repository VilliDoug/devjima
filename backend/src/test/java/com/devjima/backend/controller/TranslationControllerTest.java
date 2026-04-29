package com.devjima.backend.controller;

import com.devjima.backend.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TranslationController.class)
@TestPropertySource(properties = "deepl.api.key=test-key")
class TranslationControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private HttpClient httpClient;

  @MockitoBean
  private JwtUtil jwtUtil;

  // =====================
  // POST /api/translate
  // =====================

  @Test
  @SuppressWarnings("unchecked")
  void 翻訳_正常なリクエストの場合_翻訳テキストを返す() throws Exception {
    String deeplResponse = """
            {
                "translations": [
                    { "text": "こんにちは世界" }
                ]
            }
            """;

    HttpResponse<String> mockResponse = (HttpResponse<String>) org.mockito.Mockito.mock(HttpResponse.class);
    when(mockResponse.body()).thenReturn(deeplResponse);
    org.mockito.Mockito.doAnswer(inv -> mockResponse)
        .when(httpClient).send(any(HttpRequest.class), any());

    String requestBody = """
            {
                "text": "Hello World",
                "targetLang": "JA"
            }
            """;

    mockMvc.perform(post("/api/translate")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.translatedText").value("こんにちは世界"));
  }

  @Test
  @SuppressWarnings("unchecked")
  void 翻訳_DeepLがエラーを返した場合_500を返す() throws Exception {
    when(httpClient.send(any(HttpRequest.class), any()))
        .thenThrow(new RuntimeException("DeepL API error"));

    String requestBody = """
            {
                "text": "Hello World",
                "targetLang": "JA"
            }
            """;

    mockMvc.perform(post("/api/translate")
            .contentType("application/json")
            .content(requestBody))
        .andExpect(status().isInternalServerError());
  }
}