package com.devjima.backend;

import org.testcontainers.containers.PostgreSQLContainer;

public class TestContainersConfig {

  public static final PostgreSQLContainer<?> postgres;

  static {
    postgres = new PostgreSQLContainer<>("postgres:15-alpine");
    postgres.start();
    Runtime.getRuntime().addShutdownHook(new Thread(postgres::stop));
  }
}