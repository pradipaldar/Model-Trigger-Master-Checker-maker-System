package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Module_Trigger_Master;
import com.repository.Module_TriggerDao;

@RestController
@CrossOrigin(origins = "*")   // allow React
@RequestMapping("/api/modules")
public class ModuleController {

    @Autowired
    private Module_TriggerDao dao;

    @GetMapping
    public List<Module_Trigger_Master> getAllModules() {
        return dao.getAllData();
    }
    
    @PutMapping("/{id}")
    public String updateModule(@PathVariable int id,
                               @RequestBody Module_Trigger_Master module) {

        module.setId(id);
        dao.updateModule(module);

        return "Updated";
    }
    
    @PostMapping
    public String addModule(@RequestBody Module_Trigger_Master module) {

        dao.insertModule(module);

        return "Module Added Successfully";
    }
    
    
}