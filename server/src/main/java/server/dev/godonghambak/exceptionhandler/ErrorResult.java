package server.dev.godonghambak.exceptionhandler;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResult {

    private String timestamp;
    private String code;
    private String message;
    private String path;
}
