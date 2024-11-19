package service;

import dto.BetDto;
import org.springframework.stereotype.Service;
import repo.DealRepo;

import java.util.List;

@Service
public class DealService {

    private DealRepo dealRepo;

    public double computeSimple(BetDto betDto){
        return betDto.getBet() * betDto.getOdds();
    }

    public double computeCombinated(List<BetDto> betDtoList){
        //double combinatedOdds =
        return 0;

    }
}
