package clean.architecture.the_real_deal_bet.enumeration;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Status {
    WIN("Gagné"),
    LOSE("Perdu"),
    ABORTED("Annulé"),
    WAITING("En attente");

    private final String status;
}
