package com.devjima.backend.controller;

import com.devjima.backend.dto.UpdateProfileRequestDTO;
import com.devjima.backend.dto.UserProfileDTO;
import com.devjima.backend.service.UserService;
import com.devjima.backend.util.AuthUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "ユーザー", description = "ユーザープロフィール管理エンドポイント")
@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;
  private final AuthUtil authUtil;

  public UserController(UserService userService, AuthUtil authUtil) {
    this.userService = userService;
    this.authUtil = authUtil;
  }

  @Operation(summary = "ユーザープロフィールを取得", description = "指定されたIDのユーザープロフィールを返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功"),
      @ApiResponse(responseCode = "404", description = "ユーザーが見つかりません")
  })
  @GetMapping("/{id}")
  public ResponseEntity<UserProfileDTO> getUserProfileById(
      @Parameter(description = "ユーザーID", example = "1")
      @PathVariable Long id
  ) {
    return ResponseEntity.ok(userService.getUserProfile(id));
  }

  @Operation(summary = "ユーザープロフィールを更新", description = "指定されたIDのユーザープロフィールを更新する。本人のみ更新可能")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "更新成功"),
      @ApiResponse(responseCode = "401", description = "認証が必要です"),
      @ApiResponse(responseCode = "403", description = "権限がありません"),
      @ApiResponse(responseCode = "404", description = "ユーザーが見つかりません")
  })
  @SecurityRequirement(name = "bearerAuth")
  @PutMapping("/{id}")
  public ResponseEntity<UserProfileDTO> updateUserProfileById(
      @Parameter(description = "更新するユーザーID", example = "1")
      @PathVariable Long id,
      @RequestBody UpdateProfileRequestDTO request) {
    String email = authUtil.getCurrentUserEmail();

    return ResponseEntity.ok(userService.updateUserProfile(
        id, request.displayName(), request.bio(),
        request.avatarUrl(), request.preferredLang(), request.country(), email)
    );
  }

  @Operation(summary = "国数を取得", description = "登録ユーザーの出身国の総数を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功")
  })
  @GetMapping("/countries/count")
  public ResponseEntity<Long> getCountryCount() {
    return ResponseEntity.ok(userService.getCountryCount());
  }

  @Operation(summary = "ユーザー数を取得", description = "登録ユーザーの総数を返す")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "取得成功")
  })
  @GetMapping("/count")
  public ResponseEntity<Long> getUserCount() {
    return ResponseEntity.ok(userService.getUserCount());
  }

}
