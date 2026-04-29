package com.devjima.backend.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

class JwtUtilTest {

  private JwtUtil jwtUtil;

  @BeforeEach
  void setUp() {
    jwtUtil = new JwtUtil();
    // Inject a test secret key via ReflectionTestUtils
    // Must be Base64 encoded and at least 256 bits (32 bytes)
    ReflectionTestUtils.setField(jwtUtil, "secret",
        "dGVzdFNlY3JldEtleUZvckRldkppbWFUZXN0aW5nMTIzNDU2Nzg5MA==");
  }

  // =====================
  // generateToken
  // =====================

  @Test
  void トークン生成_メールアドレスを含むトークンを返す() {
    String token = jwtUtil.generateToken("tanaka@devjima.com");

    assertThat(token).isNotNull();
    assertThat(token.split("\\.")).hasSize(3); // header.payload.signature
  }

  // =====================
  // extractEmail
  // =====================

  @Test
  void メール抽出_正しいトークンの場合_メールを返す() {
    String token = jwtUtil.generateToken("tanaka@devjima.com");

    String email = jwtUtil.extractEmail(token);

    assertThat(email).isEqualTo("tanaka@devjima.com");
  }

  // =====================
  // isTokenValid
  // =====================

  @Test
  void トークン検証_正しいトークンの場合_trueを返す() {
    String token = jwtUtil.generateToken("tanaka@devjima.com");

    assertThat(jwtUtil.isTokenValid(token)).isTrue();
  }

  @Test
  void トークン検証_改ざんされたトークンの場合_falseを返す() {
    assertThat(jwtUtil.isTokenValid("invalid.token.here")).isFalse();
  }

  @Test
  void トークン検証_空文字の場合_falseを返す() {
    assertThat(jwtUtil.isTokenValid("")).isFalse();
  }
}