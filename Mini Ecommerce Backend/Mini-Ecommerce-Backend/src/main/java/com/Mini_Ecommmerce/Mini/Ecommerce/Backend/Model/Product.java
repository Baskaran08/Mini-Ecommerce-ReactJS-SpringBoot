package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String img_url;
    private double base_price;
    private double price;
    private int discount;
    private int stock;
    private String category;
    private double rating;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImg_url() {
		return img_url;
	}
	public void setImg_url(String img_url) {
		this.img_url = img_url;
	}
	public double getBase_price() {
		return base_price;
	}
	public void setBase_price(double base_price) {
		this.base_price = base_price;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public Product(Long id, String name, String description, String img_url, double base_price, double price,
			int discount, int stock, String category, double rating) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.img_url = img_url;
		this.base_price = base_price;
		this.price = price;
		this.discount = discount;
		this.stock = stock;
		this.category = category;
		this.rating = rating;
	}
	
	
	
	public Product(String name, String description, String img_url, double base_price, int discount, int stock,
			String category, double rating) {
		super();
		this.name = name;
		this.description = description;
		this.img_url = img_url;
		this.base_price = base_price;
		this.discount = discount;
		this.stock = stock;
		this.category = category;
		this.rating = rating;
	}
	public Product(String name, String description, String img_url, double base_price, double price, int discount,
			int stock, String category, double rating) {
		super();
		this.name = name;
		this.description = description;
		this.img_url = img_url;
		this.base_price = base_price;
		this.price = price;
		this.discount = discount;
		this.stock = stock;
		this.category = category;
		this.rating = rating;
	}
	public Product() {
		super();
	}
    
    
}