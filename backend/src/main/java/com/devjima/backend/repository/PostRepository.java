package com.devjima.backend.repository;

import com.devjima.backend.model.Post;
import com.devjima.backend.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findByAuthor(User author);
  List<Post> findByLanguage(String language);
  List<Post> findByTitleContainingIgnoreCase(String title);
  List<Post> findByTitleContainingIgnoreCaseAndLanguage(String title, String language);
  List<Post> findByTagsSlug(String slug);

}
