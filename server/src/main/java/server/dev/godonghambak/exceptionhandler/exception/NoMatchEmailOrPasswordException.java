package server.dev.godonghambak.exceptionhandler.exception;

public class  NoMatchEmailOrPasswordException extends RuntimeException {
    public NoMatchEmailOrPasswordException() {
        super();
    }

    public NoMatchEmailOrPasswordException(String message) {
        super(message);
    }

    public NoMatchEmailOrPasswordException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoMatchEmailOrPasswordException(Throwable cause) {
        super(cause);
    }

    protected NoMatchEmailOrPasswordException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
