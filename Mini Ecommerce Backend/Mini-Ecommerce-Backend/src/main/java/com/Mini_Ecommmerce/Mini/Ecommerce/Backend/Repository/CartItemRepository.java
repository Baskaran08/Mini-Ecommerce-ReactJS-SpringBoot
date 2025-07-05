package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.CartItem;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.User;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
}