package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.User;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Repository.UserRepository;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Security.JwtUtil;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
    private  UserRepository userRepository;
	
	@Autowired
    private  JwtUtil jwtUtil;
	
	@Autowired
    private  AuthenticationManager authenticationManager;
	
	@Autowired
	private  PasswordEncoder passwordEncoder;

	@Override
	public ResponseEntity<?> register(User user) {
	    try {
	        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
	        if (existingUser.isPresent()) {
	            return ResponseEntity.badRequest().body(Map.of(
	                "error", true,
	                "message", "Email already exists"
	            ));
	        }

	        user.setRole("ROLE_USER");
	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        User savedUser = userRepository.save(user);

	        String token = jwtUtil.generateToken(savedUser.getEmail());

	        Map<String, Object> response = new HashMap<>();
	        response.put("error", false);
	        response.put("user", Map.of("name",savedUser.getName(),"email",savedUser.getEmail(),"role",savedUser.getRole()));
	        response.put("token", token);
	        response.put("message", "User registered successfully");

	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
	            "error", true,
	            "message", "Registration failed: " + e.getMessage()
	        ));
	    }
	}

	@Override
    public ResponseEntity<?> login(User user) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );

            User retreivedUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            String token = jwtUtil.generateToken(user.getEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("error", false);
            response.put("token", token);
            response.put("user", Map.of("name",retreivedUser.getName(),"email",retreivedUser.getEmail(),"role",retreivedUser.getRole()));
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", true);
            errorResponse.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
	
	@Override
	public List<User> getAllUsers() {
        return userRepository.findAll();
    }
	
	@Override
	public void deleteUserById(Long id) {
	    if (!userRepository.existsById(id)) {
	        throw new RuntimeException("User not found with ID: " + id);
	    }
	    userRepository.deleteById(id);
	}
}
