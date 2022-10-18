package server.dev.godonghambak.exceptionhandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;

@Slf4j
@RestControllerAdvice
public class ExceptionControllerAdvice {

    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Calendar now = Calendar.getInstance();

    String nowDateTime = sdf1.format(now.getTime());

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalServerException.class)
    public ErrorResult internalServerExHandler(InternalServerException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("C001", "DB Error", request.getRequestURI(), nowDateTime);
    }
}
