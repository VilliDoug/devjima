package com.devjima.backend.dto;

public record LoginResponseDTO(String token, Long userId, String username) {

}
