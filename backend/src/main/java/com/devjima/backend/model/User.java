package com.devjima.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false, length = 50)
  private String username;

  @Column(unique = true, nullable = false, length = 255)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(name = "display_name", length = 100)
  private String displayName;

  private String bio;

  @Column(name = "avatar_url", length = 500)
  private String avatarUrl;

  @Column(name = "preferred_lang", length = 2)
  private String preferredLang = "en";

  @Column(length = 100)
  private String country;

  @Enumerated(EnumType.STRING)
  @Column(length = 20)
  private Role role = Role.USER;

  @Column(name = "created_at")
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at")
  private LocalDateTime updatedAt = LocalDateTime.now();

  public enum Role {
    USER, MODERATOR, ADMIN
  }

}
