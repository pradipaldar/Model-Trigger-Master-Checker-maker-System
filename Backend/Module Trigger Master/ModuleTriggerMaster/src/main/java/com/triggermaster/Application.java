package com.triggermaster;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com")
@EnableScheduling
public class Application {

	public static void main(String args[]) {
		
		//ApplicationContext context = new AnnotationConfigApplicationContext(MyConfiguration.class);

		//TriggerService service = context.getBean(TriggerService.class);
	   	SpringApplication.run(Application.class ,args);

		 System.out.println("hello");
		
		}
	

}

