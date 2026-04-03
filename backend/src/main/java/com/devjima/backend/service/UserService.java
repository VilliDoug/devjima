package com.devjima.backend.service;

import com.devjima.backend.model.User;
import com.devjima.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private UserRepository userRepository;
  // Encoder will "Hash" the password before saving
  private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  // Constructor injection was recommended for the repository
  public UserService(UserRepository userRepository){
    this.userRepository = userRepository;
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
        .orElseThrow(() -> new RuntimeException("User not found"));
  }

}


