package org.randol.medusa.repositories;

import org.randol.medusa.entities.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepository extends JpaRepository<Media, Integer> {
}