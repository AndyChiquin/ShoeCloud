package com.example.cart.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("Cart") // Para que Redis lo maneje como entidad
public class Cart implements Serializable {

    private Integer id;
    private Integer userId;
    private LocalDateTime createdAt;
}