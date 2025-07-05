package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
