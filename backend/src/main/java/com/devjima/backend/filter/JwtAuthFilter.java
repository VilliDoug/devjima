package com.devjima.backend.filter;

import com.devjima.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  public JwtAuthFilter(JwtUtil jwtUtil) {
    this.jwtUtil = jwtUtil;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

//    missing
    String authHeader = request.getHeader("Authorization");

//    add null checker
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);

      if (jwtUtil.isTokenValid(token)) {
        String email = jwtUtil.extractEmail(token);

//        email is the principal,
//        null is credentials (not needed after login),
//        empty list is authorities/roles for now
      UsernamePasswordAuthenticationToken authentication =
          new UsernamePasswordAuthenticationToken(email, null, List.of());

        SecurityContextHolder.getContext().setAuthentication(authentication);

      }
    }
    filterChain.doFilter(request, response);
  }
}
