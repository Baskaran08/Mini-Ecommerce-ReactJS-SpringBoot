package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.Product;

public interface ProductService {

	ResponseEntity<?> getAllProducts();

	ResponseEntity<?> getProductById(Long id);

	ResponseEntity<?> createProduct(Product product);

	ResponseEntity<?> updateProduct(Long id, Product product);

	ResponseEntity<?> deleteProduct(Long id);

	ResponseEntity<?> addMultipleProducts(List<Product> products);

	List<Product> searchProducts(String keyword);

	List<Product> getProductsByCategory(String category);

}
