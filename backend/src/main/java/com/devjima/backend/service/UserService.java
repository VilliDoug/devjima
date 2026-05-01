package com.devjima.backend.service;

import com.devjima.backend.dto.UserProfileDTO;
import com.devjima.backend.exception.ResourceNotFoundException;
import com.devjima.backend.exception.UnauthorizedException;
import com.devjima.backend.exception.DuplicateResourceException;
import com.devjima.backend.mapper.DTOMapper;
import com.devjima.backend.model.User;
import com.devjima.backend.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.Objects;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
  private UserRepository userRepository;
  private DTOMapper dtoMapper;
  private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public UserService(UserRepository userRepository, DTOMapper dtoMapper){
    this.userRepository = userRepository;
    this.dtoMapper = dtoMapper;
  }

  @Transactional
  public User registerUser(String username, String email, String password){
    if (userRepository.findByEmail(email).isPresent()) {
      throw new DuplicateResourceException("Email already in use");
    }
    User user = new User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);
    return user;
  }

  @Transactional(readOnly = true)
  public User loginUser(String email, String password) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UnauthorizedException("Unregistered email - please verify the email address"));

    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new UnauthorizedException("Invalid password");
    }
    return user;
  }

  @Transactional(readOnly = true)
  public User findByEmail(String email) {
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
  }

  @Transactional(readOnly = true)
  public UserProfileDTO getUserProfile(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    return dtoMapper.toUserProfileDTO(user);
  }

  @Transactional
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

  @Transactional(readOnly = true)
  public Long getCountryCount() {
    return userRepository.countDistinctCountries();
  }

  @Transactional(readOnly = true)
  public Long getUserCount() {
    return userRepository.count();
  }

}


