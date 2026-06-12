package com.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.config.MyConfiguration;
import com.model.Module_Trigger_Master;
import com.repository.Module_TriggerDao;

@Service
@Transactional
public class TriggerService {

    @Autowired
    private Module_TriggerDao dao;

    @Autowired
    private JarServiceManager jarManager;

    @Autowired
    private MyConfiguration config;

    public void execute() {

        List<Module_Trigger_Master> list = dao.allData();

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        for (Module_Trigger_Master t : list) {

            String jarPath = config.getJarBasePath()
                    + t.getJar_name()
                    + ".jar";

            // ❗ PRIORITY RULE: SERVICE OFF = ALWAYS STOP
            if ("OFF".equalsIgnoreCase(t.getService_status())) {

                if (jarManager.isRunning(jarPath)) {
                    jarManager.stopJar(jarPath);
                }

                continue;
            }

            // ❌ NOT TODAY → STOP IF RUNNING AND SKIP
            if (t.getHoliday_date() == null
                    || !today.equals(t.getHoliday_date())) {

                if (jarManager.isRunning(jarPath)) {
                    jarManager.stopJar(jarPath);
                }

                continue;
            }

            // ✅ ONLY TODAY + SERVICE ON
            boolean shouldRun = !now.isBefore(t.getStart_time())
                             && !now.isAfter(t.getEnd_time());

            boolean isRunning = jarManager.isRunning(jarPath);

            if (shouldRun) {

                if (!isRunning) {
                    jarManager.startJar(jarPath);
                }

            } else {

                if (isRunning) {
                    jarManager.stopJar(jarPath);
                }
            }
        }
    }
}