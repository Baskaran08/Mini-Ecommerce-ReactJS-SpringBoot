package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.CartItem;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.Product;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.User;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.CartItemRepository;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.ProductRepository;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.UserRepository;

@Service
public class CartItemServiceImpl implements CartItemService {

	@Autowired
    private  CartItemRepository cartItemRepository;
	
	@Autowired
    private  UserRepository userRepository;
	
	@Autowired
    private  ProductRepository productRepository;

    @Override
    public ResponseEntity<?> addToCart(Map<String, Object> requestBody, Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Long productId = Long.valueOf(requestBody.get("productId").toString());
            int quantity = (int) requestBody.get("quantity");

            Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

            CartItem cartItem = new CartItem();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setPrice(product.getPrice() * quantity);
            CartItem saved = cartItemRepository.save(cartItem);

            return ResponseEntity.ok(Map.of("error", false, "cartItem", saved, "message", "Added to cart"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> getCartItems(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            List<CartItem> items = cartItemRepository.findByUser(user);
            return ResponseEntity.ok(Map.of("error", false, "cartItems", items));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> removeCartItem(Long id) {
        try {
            cartItemRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("error", false, "message", "Item removed"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> updateCartItemQuantity(Long id, Map<String, Object> requestBody) {
        try {
            CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

            int quantity = (int) requestBody.get("quantity");
            cartItem.setQuantity(quantity);
            cartItem.setPrice(cartItem.getProduct().getPrice() * quantity);
            CartItem updated = cartItemRepository.save(cartItem);

            return ResponseEntity.ok(Map.of(
                "error", false,
                "cartItem", updated,
                "message", "Cart item quantity updated"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }
}