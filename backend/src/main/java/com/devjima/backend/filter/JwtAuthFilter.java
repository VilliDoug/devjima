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

/*
filterChain.doFilter(request, response);

This is outside the if block — critical.
It means "pass this request along to the
 next filter/controller regardless of whether a token was found".

Without this line every request would stop here and never reach your controllers.
 The filter's job is to *enrich* the request with identity info,
  not to block it — blocking is `SecurityConfig`'s job.

---

Request comes in
  → JwtAuthFilter reads the Authorization header
  → If token exists and is valid:
      → extract email
      → write "this request belongs to email@x.com" on the sticky note
  → Pass request along regardless
  → SecurityConfig checks the sticky note:
      → Protected route + no sticky note = 403
      → Protected route + sticky note = let through
      → Public route = always let through
 */
