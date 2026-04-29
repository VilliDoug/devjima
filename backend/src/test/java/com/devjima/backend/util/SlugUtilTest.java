package com.devjima.backend.util;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class SlugUtilTest {

  private final SlugUtil slugUtil = new SlugUtil();

  @Test
  void スラッグ生成_スペースをハイフンに変換する() {
    assertThat(slugUtil.generateSlug("Spring Boot Tips")).isEqualTo("spring-boot-tips");
  }

  @Test
  void スラッグ生成_大文字を小文字に変換する() {
    assertThat(slugUtil.generateSlug("Hello World")).isEqualTo("hello-world");
  }

  @Test
  void スラッグ生成_特殊文字を除去する() {
    assertThat(slugUtil.generateSlug("Hello, World!")).isEqualTo("hello-world");
  }

  @Test
  void スラッグ生成_重複ハイフンを除去する() {
    assertThat(slugUtil.generateSlug("hello--world")).isEqualTo("hello-world");
  }

  @Test
  void スラッグ生成_日本語文字を除去する() {
    assertThat(slugUtil.generateSlug("Spring 春 Boot")).isEqualTo("spring-boot");
  }

  @Test
  void スラッグ生成_数字を保持する() {
    assertThat(slugUtil.generateSlug("Java 21 Features")).isEqualTo("java-21-features");
  }

  @Test
  void スラッグ生成_複数スペースを単一ハイフンに変換する() {
    assertThat(slugUtil.generateSlug("hello   world")).isEqualTo("hello-world");
  }
}