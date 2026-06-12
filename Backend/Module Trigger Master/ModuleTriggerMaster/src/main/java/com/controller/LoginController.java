package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.LoginRequest;
import com.service.LoginService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class LoginController {

	@Autowired
	private LoginService service;

//	@PostMapping("/login")
//	public String login(@RequestBody LoginRequest request) {
//		return service.authenticate(request);
//	}
	@PostMapping("/login")
	public String login(@RequestBody LoginRequest request) {

	    System.out.println("LOGIN ENDPOINT HIT");

	    return service.authenticate(request);
	}
}
