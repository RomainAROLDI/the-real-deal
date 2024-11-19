package entity;

import dto.BetDto;
import enumeration.BetType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double gains;

    private Date creation;

    private BetType betType;

    @OneToMany(mappedBy = "deal")
    private List<BetDto> betDtoList;

}

