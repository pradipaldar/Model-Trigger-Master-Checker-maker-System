package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.LoginHistory;
import com.repository.LoginHistoryDao;

@Service
public class LoginHistoryService {

	
	    
	    @Autowired
	    private LoginHistoryDao dao;

	    public void login(int userId) {
	        dao.saveLogin(userId, "SUCCESS");
	    }
	

	    public void logout(int loginId) {

	        dao.logout(loginId);
	    }
	    
    public List<LoginHistory> getAllHistory() {

        return dao.getAllHistory();
    }
    
}