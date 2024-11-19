package controller;

import dto.BetDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.DealService;

import java.util.List;

@RestController
@RequestMapping("/deal")
public class DealController {

    private DealService dealService;

    @PostMapping
    public void saveDeal(@RequestBody List<BetDto> betDtoList){
        if(betDtoList.size() == 1){
            dealService.computeSimple(betDtoList.get(0));
        } else if (betDtoList.size() > 1) {
            dealService.computeCombinated(betDtoList);
        }
    }

}
