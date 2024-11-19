package enumeration;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum BetType {

    HOME("1"),
    EXTERNAL("2"),
    NUL("0");

    private final String type;

}
