package com.example.cart.service;

import com.example.cart.model.Cart;
import com.example.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Crear un carrito
    public Cart createCart(Integer userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setCreatedAt(LocalDateTime.now());

        // ID puede generarse aleatoriamente o mediante lógica adicional
        cart.setId((int) (Math.random() * 100000)); // TEMPORAL

        return cartRepository.save(cart);
    }

    // Obtener un carrito por ID
    public Optional<Cart> getCartById(Integer cartId) {
        return cartRepository.findById(cartId);
    }

    // Eliminar un carrito
    public void deleteCart(Integer cartId) {
        cartRepository.deleteById(cartId);
    }
}
