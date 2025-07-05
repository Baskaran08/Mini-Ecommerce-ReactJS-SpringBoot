package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface CartItemService {

	ResponseEntity<?> addToCart(Map<String, Object> requestBody, Authentication authentication);

	ResponseEntity<?> getCartItems(Authentication authentication);

	ResponseEntity<?> removeCartItem(Long id);

	ResponseEntity<?> updateCartItemQuantity(Long id, Map<String, Object> requestBody);

}
