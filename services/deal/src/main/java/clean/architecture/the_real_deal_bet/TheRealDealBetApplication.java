package clean.architecture.the_real_deal_bet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TheRealDealBetApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheRealDealBetApplication.class, args);
	}

}
