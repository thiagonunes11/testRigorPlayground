package com.testRigorPlayground.apitestrigor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ApiTestrigorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiTestrigorApplication.class, args);
	}

}
