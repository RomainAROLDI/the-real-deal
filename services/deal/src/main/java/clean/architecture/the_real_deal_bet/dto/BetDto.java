package clean.architecture.the_real_deal_bet.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BetDto {

    private int id;
    private int matchId;
    private int userId;
    private String betType;
    private double odds;
    private Date deadline;
    private double bet;

}
