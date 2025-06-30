package com.example.cart.repository;

import com.example.cart.model.Cart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends CrudRepository<Cart, Integer> {
    // Puedes agregar métodos personalizados si lo necesitas
}