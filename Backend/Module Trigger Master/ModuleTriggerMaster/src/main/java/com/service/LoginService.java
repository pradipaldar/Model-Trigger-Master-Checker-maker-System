package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.LoginRequest;
import com.model.User;
import com.repository.UserDao;
import com.security.JwtUtil;

@Service
public class LoginService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private LoginHistoryService loginHistoryService;

    @Autowired
    private JwtUtil jwtUtil;

    public String authenticate(LoginRequest request) {

        User user = userDao.getUserByUsername(request.getUsername());

        if (user == null) return "Invalid User";

        if (!user.getPassword().equals(request.getPassword())) return "Wrong Password";

        String token = jwtUtil.generateToken(
                user.getUsername(),
                user.getRole(),
                user.getUserId()
        );

        return token;
    }
}