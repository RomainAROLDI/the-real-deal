package clean.architecture.the_real_deal_bet.service;

import clean.architecture.the_real_deal_bet.entity.Deal;
import clean.architecture.the_real_deal_bet.enumeration.Status;
import clean.architecture.the_real_deal_bet.repo.DealRepo;
import clean.architecture.the_real_deal_bet.dto.BetDto;
import clean.architecture.the_real_deal_bet.enumeration.BetType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DealService {

    private static final Logger log = LoggerFactory.getLogger(DealService.class);
    private final DealRepo dealRepo;

    public List<Deal> findAll(){
        return dealRepo.findAll();
    }

    public Deal findById(Long id){
        return dealRepo.findById(id).get();
    }

    public ResponseEntity processSimple(BetDto betDto){
        try{
            dealRepo.save(Deal.builder()
                    .betDtoList(List.of(betDto.getId()))
                    .creation(LocalDateTime.now())
                    .gains(computeGains(betDto.getBet(),betDto.getOdds()))
                    .betType(BetType.SIMPLE)
                    .status(Status.WAITING)
                    .build());
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity processCombinated(List<BetDto> betDtoList){
        double gains = computeCombinated(betDtoList);
        if(gains <= 100000){
            try {
                dealRepo.save(Deal.builder()
                        .betDtoList(betDtoList.stream().map(BetDto::getId).collect(Collectors.toList()))
                        .creation(LocalDateTime.now())
                        .gains(computeCombinated(betDtoList))
                        .betType(BetType.COMBINATED)
                        .status(Status.WAITING)
                        .build());
            }catch (Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }else{
            log.info("Somme maximum des gains dépassé");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public double computeCombinated(List<BetDto> betDtoList){
        double combinatedOdds = 0;

        for (BetDto bet : betDtoList) {
            if (combinatedOdds == 0){
                combinatedOdds = bet.getOdds();
            }
            combinatedOdds *= bet.getOdds();
        }

        return computeGains(betDtoList.get(0).getBet(), combinatedOdds);
    }

    private double computeGains(double bet, double odds){
        return bet * odds;
    }
}
