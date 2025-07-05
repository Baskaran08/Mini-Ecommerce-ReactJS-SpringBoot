package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.Product;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
    private  ProductRepository productRepository;

    @Override
    public ResponseEntity<?> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(Map.of("error", false, "products", products));
    }

    @Override
    public ResponseEntity<?> getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(Map.of("error", false, "product", product.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", true, "message", "Product not found"));
        }
    }

    @Override
    public ResponseEntity<?> createProduct(Product product) {
        try {
        	double price=product.getBase_price() - ((product.getBase_price()*product.getDiscount())/100);
        	product.setPrice(price);
            Product saved = productRepository.save(product);
            return ResponseEntity.ok(Map.of("error", false, "product", saved, "message", "Product created"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", true, "message", e.getMessage()));
        }
    }

    @Override
    public ResponseEntity<?> updateProduct(Long id, Product product) {
        Optional<Product> existing = productRepository.findById(id);
        if (existing.isPresent()) {
            product.setId(id);
            double price=product.getBase_price() - ((product.getBase_price()*product.getDiscount())/100);
            product.setPrice(price);
            Product updated = productRepository.save(product);
            return ResponseEntity.ok(Map.of("error", false, "product", updated, "message", "Product updated"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", true, "message", "Product not found"));
        }
    }

    @Override
    public ResponseEntity<?> deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("error", false, "message", "Product deleted"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", true, "message", "Product not found"));
        }
    }
    
    
    @Override
    public ResponseEntity<?> addMultipleProducts(List<Product> products) {
        try {
            for (Product product : products) {
                // Auto calculate price from base price and discount
                double discountAmount = product.getBase_price() * (product.getDiscount() / 100.0);
                double finalPrice = product.getBase_price() - discountAmount;
                product.setPrice(Math.round(finalPrice * 100.0) / 100.0); // round to 2 decimal
            }

            List<Product> saved = productRepository.saveAll(products);

            return ResponseEntity.ok(Map.of(
                "error", false,
                "message", "Products added successfully",
                "products", saved
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", true, "message", "Bulk insert failed: " + e.getMessage()));
        }
    }
    
    @Override
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(keyword, keyword);
    }
    
    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }
}