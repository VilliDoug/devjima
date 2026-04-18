package com.devjima.backend.service;

import com.devjima.backend.dto.UserProfileDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.exception.UnauthorizedException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private UserRepository userRepository;
  private DTOMapper dtoMapper;
  // Encoder will "Hash" the password before saving
  private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  // Constructor injection was recommended for the repository
  public UserService(UserRepository userRepository, DTOMapper dtoMapper){
    this.userRepository = userRepository;
    this.dtoMapper = dtoMapper;
  }

  //  Register (POST) service method for a User - make separate DTO later!
  public User registerUser(String username, String email, String password){
  //  Check if email already exists in DB
    if (userRepository.findByEmail(email).isPresent()) {
      throw new RuntimeException("Email already in use");
    }
  //  Build User
    User user = new User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);
    return user;
  }

  public User loginUser(String email, String password) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Unregistered email - please verify the email address"));

    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new RuntimeException("Invalid password");
    }
    return user;
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }

  public UserProfileDTO getUserProfile(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    return dtoMapper.toUserProfileDTO(user);
  }

  public UserProfileDTO updateUserProfile(
      Long id, String displayName, String bio,
      String avatarUrl, String preferredLang, String country, String currentUserEmail) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    if (Objects.equals(user.getEmail(), currentUserEmail)) {
      user.setDisplayName(displayName);
      user.setBio(bio);
      user.setAvatarUrl(avatarUrl);
      user.setPreferredLang(preferredLang);
      user.setCountry(country);
      user.setUpdatedAt(LocalDateTime.now());
    } else {
      throw new UnauthorizedException("Request unauthorized");
    }
    userRepository.save(user);
    return dtoMapper.toUserProfileDTO(user);
  }

  public Long getCountryCount() {
    return userRepository.countDistinctCountries();
  }

  public Long getUserCount() {
    return userRepository.count();
  }

}


