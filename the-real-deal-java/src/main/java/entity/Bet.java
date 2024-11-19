package entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Bet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int matchID;

    private int userId;

    private Date deadline;

    private String betType;

    private double odds;

    private double bet;

    @ManyToOne
    @JoinColumn(name = "id")
    private Deal deal;

}
