package com.example.cart.controller;

import com.example.cart.model.CartItem;
import com.example.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/{userId}/add")
    public String addToCart(@PathVariable String userId, @RequestBody CartItem item) {
        cartService.addToCart(userId, item);
        return "Product added to cart";
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable String userId) {
        return cartService.getCart(userId);
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public String removeFromCart(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeFromCart(userId, productId);
        return "Product removed from cart";
    }

    @DeleteMapping("/{userId}/clear")
    public String clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
        return "Cart cleared";
    }
}
