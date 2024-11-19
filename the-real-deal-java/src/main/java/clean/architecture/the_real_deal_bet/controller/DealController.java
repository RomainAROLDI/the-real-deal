package clean.architecture.the_real_deal_bet.controller;

import clean.architecture.the_real_deal_bet.dto.BetDto;
import clean.architecture.the_real_deal_bet.entity.Deal;
import clean.architecture.the_real_deal_bet.service.DealService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    private final DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }

    @GetMapping
    public Deal findDealById(@RequestParam Long id){
        return dealService.findById(id);
    }


    @GetMapping("/all")
    public List<Deal> findAllDeals(){
        return dealService.findAll();
    }

    @PostMapping
    public ResponseEntity createDeal(@RequestBody List<BetDto> betDtoList) {
        if (validateBet(betDtoList)) {
            if (betDtoList.size() == 1) {
                return dealService.processSimple(betDtoList.get(0));
            } else if (betDtoList.size() > 1) {
                return dealService.processCombinated(betDtoList);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private boolean validateBet(List<BetDto> betDtoList) {
        List<BetDto> differentMatchs = betDtoList.stream()
                .filter(new java.util.function.Predicate<BetDto>() {
                    private final Set<Integer> seen = new HashSet<>();

                    @Override
                    public boolean test(BetDto betDto) {
                        return seen.add(betDto.getId());  // Retourne true si l'id n'est pas déjà vu
                    }
                })
                .toList();
        List<BetDto> goodBet = betDtoList.stream()
                .filter(bet -> bet.getBet() >= 0.10 && bet.getBet() <= 1000)
                .toList();

        return (betDtoList.size() <= 20) &&
                (goodBet.size() == betDtoList.size()) &&
                (differentMatchs.size() == betDtoList.size());
    }
}
