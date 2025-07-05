package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.CartItem;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.Order;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.OrderItem;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.Product;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.User;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.CartItemRepository;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.OrderRepository;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.ProductRepository;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
    private  OrderRepository orderRepository;
		
	@Autowired
    private  UserRepository userRepository;
	
	@Autowired
    private  CartItemRepository cartItemRepository;
	
	@Autowired
	private ProductRepository productRepository;

    @Override
    public ResponseEntity<?> placeOrder(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElseThrow();

            List<CartItem> cartItems = cartItemRepository.findByUser(user);
            if (cartItems.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", true, "message", "Cart is empty"));
            }

            Order order = new Order();
            order.setUser(user);
            order.setOrderDate(new Date());
            order.setStatus("Pending");

            double totalAmount = 0;
            List<OrderItem> orderItems = new ArrayList<>();
            for (CartItem cartItem : cartItems) {
            	
            	Product product = cartItem.getProduct();
	            int orderedQty = cartItem.getQuantity();
	
	            if (product.getStock() < orderedQty) {
	                return ResponseEntity.badRequest().body(Map.of(
	                    "error", true,
	                    "message", "Not enough stock for product: " + product.getName()
	                ));
	            }
	
	            product.setStock(product.getStock() - orderedQty);
	            productRepository.save(product);
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(cartItem.getProduct());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
                orderItem.setOrder(order);
                orderItems.add(orderItem);
                totalAmount += orderItem.getPrice();
            }

            order.setTotalAmount(totalAmount);
            order.setOrderItems(orderItems);
            Order savedOrder = orderRepository.save(order);

            cartItemRepository.deleteAll(cartItems);

            return ResponseEntity.ok(Map.of("error", false, "order", savedOrder, "message", "Order placed successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> getOrders(Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElseThrow();
            List<Order> orders = orderRepository.findByUser(user);
            return ResponseEntity.ok(Map.of("error", false, "orders", orders));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> getAllOrdersForAdmin() {
        try {
            List<Order> orders = orderRepository.findAll();
            return ResponseEntity.ok(Map.of("error", false, "orders", orders));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }
    
    @Override
    public ResponseEntity<?> updateOrderStatus(Long orderId, String newStatus) {
        try {
            Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

            order.setStatus(newStatus);
            orderRepository.save(order);

            return ResponseEntity.ok(Map.of(
                "error", false,
                "order", order,
                "message", "Order status updated successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                Map.of("error", true, "message", e.getMessage())
            );
        }
    }
    
    @Override
    public void deleteOrderById(Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (!orderOptional.isPresent()) {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }

}
