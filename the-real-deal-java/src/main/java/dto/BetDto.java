package dto;

import lombok.Data;

import java.util.Date;

@Data
public class BetDto {

    private int matchId;
    private int userId;
    private String betType;
    private double odds;
    private Date deadline;
    private double bet;

}
