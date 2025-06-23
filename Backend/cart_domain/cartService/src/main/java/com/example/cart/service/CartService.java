package com.example.cart.service;

import com.example.cart.model.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void addToCart(String userId, CartItem item) {
        String key = "cart:" + userId;
        List<CartItem> cart = (List<CartItem>) redisTemplate.opsForValue().get(key);
        if (cart == null) {
            cart = new ArrayList<>();
        }

        boolean updated = false;
        for (CartItem c : cart) {
            if (c.getProductId().equals(item.getProductId())) {
                c.setQuantity(c.getQuantity() + item.getQuantity());
                updated = true;
                break;
            }
        }
        if (!updated) {
            cart.add(item);
        }
        redisTemplate.opsForValue().set(key, cart);
    }

    public List<CartItem> getCart(String userId) {
        String key = "cart:" + userId;
        List<CartItem> cart = (List<CartItem>) redisTemplate.opsForValue().get(key);
        return cart != null ? cart : new ArrayList<>();
    }

    public void removeFromCart(String userId, String productId) {
        String key = "cart:" + userId;
        List<CartItem> cart = (List<CartItem>) redisTemplate.opsForValue().get(key);
        if (cart != null) {
            cart.removeIf(item -> item.getProductId().equals(productId));
            redisTemplate.opsForValue().set(key, cart);
        }
    }

    public void clearCart(String userId) {
        String key = "cart:" + userId;
        redisTemplate.delete(key);
    }
}
