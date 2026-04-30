package com.devjima.backend.repository;

import com.devjima.backend.model.Comment;
import com.devjima.backend.model.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

  List<Comment> findByPostAndParentCommentIsNull(Post post);
  List<Comment> findByParentComment(Comment parentComment);
  List<Comment> findByPost(Post post);

}
