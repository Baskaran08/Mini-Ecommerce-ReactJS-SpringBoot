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

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	@Autowired
    private  OrderService orderService;

    @PostMapping
    public ResponseEntity<?> placeOrder(Authentication authentication) {
        return orderService.placeOrder(authentication);
    }

    @GetMapping
    public ResponseEntity<?> getOrders(Authentication authentication) {
        return orderService.getOrders(authentication);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrdersForAdmin() {
        return orderService.getAllOrdersForAdmin();
    }
    
    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> responseBody) {
        String newStatus = responseBody.get("status");
        return orderService.updateOrderStatus(orderId, newStatus);
    }
    
    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        try {
            orderService.deleteOrderById(orderId);
            return ResponseEntity.ok().body(Map.of("message","Order deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting order: " + e.getMessage());
        }
    }
}