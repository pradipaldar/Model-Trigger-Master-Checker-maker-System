package com.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class JarServiceManager {

	private Map<String, Process> running = new ConcurrentHashMap<String, Process>();

	public void startJar(final String path) {
		try {
			Process existing = running.get(path);

			if (existing != null && existing.isAlive()) {
				return;
			}

			ProcessBuilder builder = new ProcessBuilder("java", "-jar", path);
			builder.redirectErrorStream(true);

			final Process process = builder.start();

			Thread.sleep(1000);

			if (!process.isAlive()) {
				log("ERROR", "JAR failed to start: " + path);
				return;
			}

			running.put(path, process);

			log("INFO", "STARTED: " + path);

			new Thread(new Runnable() {
				public void run() {
					readLogs(process, path);
				}
			}).start();

		} catch (Exception e) {
			log("ERROR", "Error starting JAR: " + path);
			e.printStackTrace();
		}
	}

	public void stopJar(String path) {
		Process process = running.get(path);

		if (process == null) {
			return;
		}

		try {
			if (process.isAlive()) {
				process.destroy();

				Thread.sleep(2000);

				if (process.isAlive()) {
					process.destroyForcibly();
					log("WARN", "Force stopped JAR: " + path);
				} else {
					log("INFO", "Stopped JAR: " + path);
				}
			}
		} catch (Exception e) {
			log("ERROR", "Error stopping JAR: " + path);
			e.printStackTrace();
		}

		running.remove(path);
	}

	public boolean isRunning(String path) {
		Process p = running.get(path);
		return p != null && p.isAlive();
	}

	private void readLogs(Process process, String path) {
		try {
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

			String line;
			while ((line = reader.readLine()) != null) {

				log("PROCESS", "[" + path + "] " + line);
			}

			reader.close();

		} catch (Exception e) {
			log("ERROR", "Error reading logs: " + path);
			
			e.printStackTrace();
}	
	}

	private void log(String level, String message) {
		System.out.println(LocalDateTime.now() + " [" + level + "] " + message);
	}
	
	
}