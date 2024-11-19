package clean.architecture.the_real_deal_bet.entity;

import clean.architecture.the_real_deal_bet.enumeration.BetType;
import clean.architecture.the_real_deal_bet.enumeration.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double gains;

    private LocalDateTime creation;

    private BetType betType;

    private List<Integer> betDtoList;

    private Status status;

}

