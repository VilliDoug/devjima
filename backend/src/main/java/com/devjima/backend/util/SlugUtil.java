package com.devjima.backend.util;

import org.springframework.stereotype.Component;

@Component
public class SlugUtil {

  public String generateSlug(String slug) {
    return slug.toLowerCase()
        .replaceAll("[^a-z0-9\\s-]", "") // remove special characters
        .replaceAll("\\s+", "-") // replace spaces with "-"
        .replaceAll("-+", "-"); // remove duplicate dashes
  }

}
