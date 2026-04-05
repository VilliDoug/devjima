package com.devjima.backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final long EXPIRATION_MS = 86400000;

    private final SecretKey key = Keys.hmacShaKeyFor(
        Decoders.BASE64.decode("devjimasecretkey256bitsdevjimasecretkey256bits"
        )
    );

// Build a JWT with the user's email baked in, signed with your secret key, expires in 24 hours
  public String generateToken(String email) {
    return Jwts.builder()
        .subject(email) // store email inside the token
        .issuedAt(new Date()) // when was it created
        .expiration(new Date(System.currentTimeMillis() + EXPIRATION_MS)) // when it expires (24h)
        .signWith(key) // "stamp" it with secret key
        .compact(); // convert to xxx.yyy.zzz string
  }

//  Cracks open a token and reads the email from it
  public String extractEmail(String token) {
    return Jwts.parser()
        .verifyWith(key) // verify "stamp"
        .build()
        .parseSignedClaims(token) // open string
        .getPayload() // read contents
        .getSubject(); // get email from inside token
  }

//  Try to parse the token, returns false if it's expired or tampered with
  public boolean isTokenValid(String token) {
    try {
      extractEmail(token); // if extraction is successful, token is valid
      return true;
    } catch (Exception e) {
      return false; //expired or tampered - exception
    }
  }

}
