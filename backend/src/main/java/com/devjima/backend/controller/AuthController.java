package com.devjima.backend.controller;

import com.devjima.backend.dto.LoginRequestDTO;
import com.devjima.backend.dto.LoginResponseDTO;
import com.devjima.backend.dto.RegisterRequestDTO;
import com.devjima.backend.model.User;
import com.devjima.backend.service.UserService;
import com.devjima.backend.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "認証", description = "ユーザー登録・ログイン認証エンドポイント")
@Validated
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private UserService userService;
  private JwtUtil jwtUtil;

  public AuthController(UserService userService, JwtUtil jwtUtil) {
    this.userService = userService;
    this.jwtUtil = jwtUtil;
  }

  @Operation(summary = "ユーザー登録", description = "新しいユーザーアカウントを作成する")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "登録成功"),
      @ApiResponse(responseCode = "400", description = "リクエストが無効です"),
      @ApiResponse(responseCode = "409", description = "メールアドレスが既に使用されています")
  })
  @PostMapping("/register")
  public ResponseEntity<String> registerUser(
      @Valid @RequestBody RegisterRequestDTO request) {
    userService.registerUser(request.username(), request.email(), request.password());
    return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
  }

  @Operation(summary = "ログイン", description = "メールアドレスとパスワードで認証し、JWTトークンを返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "ログイン成功"),
      @ApiResponse(responseCode = "400", description = "リクエストが無効です"),
      @ApiResponse(responseCode = "401", description = "メールアドレスまたはパスワードが正しくありません")
  })
  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> loginUser(
      @Valid @RequestBody LoginRequestDTO request) {
    User user = userService.loginUser(request.email(), request.password());
    String token = jwtUtil.generateToken(request.email());
    return ResponseEntity.ok(new LoginResponseDTO(token, user.getId(), user.getUsername()));
  }
}
