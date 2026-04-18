package com.devjima.backend.repository;

import com.devjima.backend.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  @Query("SELECT COUNT(DISTINCT u.country) FROM User u WHERE u.country IS NOT NULL")
  Long countDistinctCountries();

}
