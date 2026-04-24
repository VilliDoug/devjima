package com.devjima.backend.config;

import com.devjima.backend.filter.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

  private final JwtAuthFilter jwtAuthFilter;

  public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
    this.jwtAuthFilter = jwtAuthFilter;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable()) //CSRF (Cross-Site Request Forgery)
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/users/count").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/users/countries/count").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/tags").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/comments/post/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/users/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/translate").permitAll()
            .anyRequest()
            .authenticated()
        )
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);



    return http.build();
  }

}
