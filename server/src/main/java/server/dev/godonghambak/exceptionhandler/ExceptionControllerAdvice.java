package server.dev.godonghambak.exceptionhandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;
import server.dev.godonghambak.exceptionhandler.exception.Store.CheckIdException;
import server.dev.godonghambak.exceptionhandler.exception.Store.NotFoundStoreException;
import server.dev.godonghambak.exceptionhandler.exception.Store.SameStoreException;
import server.dev.godonghambak.exceptionhandler.exception.authentication.CheckPasswordException;
import server.dev.godonghambak.exceptionhandler.exception.authentication.SessionException;
import server.dev.godonghambak.exceptionhandler.exception.NoMatchEmailOrPasswordException;
import server.dev.godonghambak.exceptionhandler.exception.memberusersign.NoSearchEmailException;
import server.dev.godonghambak.exceptionhandler.exception.memberusersign.SameEmailException;
import server.dev.godonghambak.exceptionhandler.exception.menu.NotFoundMenuException;
import server.dev.godonghambak.exceptionhandler.exception.menu.SameMenuExHandler;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Slf4j
@RestControllerAdvice
public class ExceptionControllerAdvice {

    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Calendar now = Calendar.getInstance();
    String nowDateTime = simpleDateFormat.format(now.getTime());

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(InternalServerException.class)
    public ErrorResult internalServerExHandler(InternalServerException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("C001", "DB Error", request.getRequestURI(), nowDateTime);
    }

    //Authentication Exception
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CheckPasswordException.class)
    public ErrorResult CheckPasswordExHandler(CheckPasswordException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("A001", "인증번호가 맞지 않거나, 인증번호 유효기간이 경과하였습니다.", request.getRequestURI(), nowDateTime);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(SessionException.class)
    public ErrorResult SessionExHandler(SessionException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("A002", "세션값이 없거나, 올바르지 않습니다.", request.getRequestURI(), nowDateTime);
    }

    //MemberUser Exception
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SameEmailException.class)
    public ErrorResult SameEmailiExHandler(SameEmailException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("MU001", "이미 회원가입 된 이메일이 존재합니다.", request.getRequestURI(), nowDateTime);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NoSearchEmailException.class)
    public ErrorResult NoSearchEmailiExHandler(NoSearchEmailException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("MU002", "해당 정보로 이메일을 찾을 수 없습니다.", request.getRequestURI(), nowDateTime);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NoMatchEmailOrPasswordException.class)
    public ErrorResult NoMatchPasswordException(NoMatchEmailOrPasswordException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("MU003", "아아디 혹은 비밀번호를 확인해주세요.", request.getRequestURI(), nowDateTime);
    }

    //Store Exception
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SameStoreException.class)
    public ErrorResult SameStoreExHandler(SameStoreException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("S001", "동일한 이름의 매장이 존재합니다.", request.getRequestURI(), nowDateTime);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NotFoundStoreException.class)
    public ErrorResult NotFoundStoreException(NotFoundStoreException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("S002", "해당 매장을 찾을 수 없습니다.", request.getRequestURI(), nowDateTime);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CheckIdException.class)
    public ErrorResult CheckIdException(CheckIdException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("S003", "본인의 매장이 아니거나, store_id 를 확인해주세요.", request.getRequestURI(), nowDateTime);
    }

    //Menu Exception
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NotFoundMenuException.class)
    public ErrorResult NotFoundMenuException(NotFoundMenuException e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("    M001", "해당 메뉴를 찾을 수 없습니다.", request.getRequestURI(), nowDateTime);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SameMenuExHandler.class)
    public ErrorResult SameMenuExHandler(SameMenuExHandler e, HttpServletRequest request) {
        log.error("[exceptionHandler] ex", e);
        return new ErrorResult("M002", "동일한 이름의 메뉴가 존재합니다.", request.getRequestURI(), nowDateTime);
    }
}
