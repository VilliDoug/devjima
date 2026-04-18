package com.devjima.backend.dto;

import com.devjima.backend.model.User.Role;
import java.time.LocalDateTime;

public record UserProfileDTO(
    Long id,
    String username,
    String displayName,
    String bio,
    String avatarUrl,
    String preferredLang,
    String country,
    Role role,
    LocalDateTime createdAt) {

}
