package server.dev.godonghambak.exceptionhandler.exception.authentication;

import org.apache.ibatis.javassist.NotFoundException;

public class CheckPasswordException extends RuntimeException{

    public CheckPasswordException() {
        super();
    }

    public CheckPasswordException(String message) {
        super(message);
    }

    public CheckPasswordException(String message, Throwable cause) {
        super(message, cause);
    }

    public CheckPasswordException(Throwable cause) {
        super(cause);
    }

    protected CheckPasswordException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
