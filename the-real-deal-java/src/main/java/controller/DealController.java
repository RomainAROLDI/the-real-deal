package controller;

import dto.BetDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/deal")
public class DealController {

    @PostMapping
    public void saveDeal(@RequestBody List<BetDto> betDtoList){

    }

}
