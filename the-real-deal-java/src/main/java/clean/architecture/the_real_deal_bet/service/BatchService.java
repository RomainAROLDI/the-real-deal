package clean.architecture.the_real_deal_bet.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class BatchService {


    @Scheduled(cron = "0 * * * * *")
    public void executeBatchJob() {
//chercher tous les pari terminé
        log.info("");//print le status de tous les pari terminé
        //mis à jour en db du status
    }
}
