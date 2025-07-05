package com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Model.User;
import com.Mini_Ecommmerce.Mini.Ecommerce.Backend.Service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

	@Autowired
    private  UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return userService.login(user);
    }
}
