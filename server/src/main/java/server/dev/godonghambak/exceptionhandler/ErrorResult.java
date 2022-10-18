package server.dev.godonghambak.exceptionhandler;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.format.DateTimeFormatter;

@Data
@AllArgsConstructor
public class ErrorResult {

    private String code;
    private String message;
    private String path;
    private String now;
}
