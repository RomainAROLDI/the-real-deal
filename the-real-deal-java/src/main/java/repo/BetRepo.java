package repo;

import entity.Bet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BetRepo extends JpaRepository<Bet,Long> {
}
