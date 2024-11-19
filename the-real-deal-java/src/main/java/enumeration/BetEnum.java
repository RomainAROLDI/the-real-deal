package enumeration;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum BetEnum {

    HOME("1"),
    EXTERNAL("2"),
    NUL("N");

    private final String type;

}
