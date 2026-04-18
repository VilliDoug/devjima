package com.devjima.backend.dto;

public record UpdateProfileRequestDTO(
    String displayName,
    String bio,
    String avatarUrl,
    String preferredLang,
    String country) {

}
