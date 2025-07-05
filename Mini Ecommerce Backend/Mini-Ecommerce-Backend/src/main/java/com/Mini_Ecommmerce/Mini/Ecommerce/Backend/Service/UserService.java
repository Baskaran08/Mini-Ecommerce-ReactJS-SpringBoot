package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.User;

public interface UserService {

	ResponseEntity<?> register(User user);

	ResponseEntity<?> login(User user);

	List<User> getAllUsers();

	void deleteUserById(Long id);

}
