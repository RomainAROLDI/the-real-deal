package clean.architecture.the_real_deal_bet.repo;

import clean.architecture.the_real_deal_bet.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepo extends JpaRepository<Deal,Long> {

}
