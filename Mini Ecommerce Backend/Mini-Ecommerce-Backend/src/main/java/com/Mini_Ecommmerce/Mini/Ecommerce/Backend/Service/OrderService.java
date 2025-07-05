package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface OrderService {

	ResponseEntity<?> placeOrder(Authentication authentication);

	ResponseEntity<?> getOrders(Authentication authentication);

	ResponseEntity<?> getAllOrdersForAdmin();

	ResponseEntity<?> updateOrderStatus(Long orderId, String newStatus);

	void deleteOrderById(Long orderId);

}
