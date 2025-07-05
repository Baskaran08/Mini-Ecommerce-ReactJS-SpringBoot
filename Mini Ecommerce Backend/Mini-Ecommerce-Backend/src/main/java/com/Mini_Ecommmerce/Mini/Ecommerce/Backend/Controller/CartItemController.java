package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service.CartItemService;

@RestController
@RequestMapping("/api/cart")
public class CartItemController {

	@Autowired
    private  CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> requestBody, Authentication authentication) {
        return cartItemService.addToCart(requestBody, authentication);
    }

    @GetMapping
    public ResponseEntity<?> getCartItems(Authentication authentication) {
        return cartItemService.getCartItems(authentication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long id) {
        return cartItemService.removeCartItem(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCartItemQuantity(@PathVariable Long id, @RequestBody Map<String, Object> requestBody) {
        return cartItemService.updateCartItemQuantity(id, requestBody);
    }
}