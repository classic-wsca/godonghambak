package server.dev.godonghambak.exceptionhandler.exception.memberusersign;

public class NoSearchEmailException extends RuntimeException {
    public NoSearchEmailException() {
        super();
    }

    public NoSearchEmailException(String message) {
        super(message);
    }

    public NoSearchEmailException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoSearchEmailException(Throwable cause) {
        super(cause);
    }

    protected NoSearchEmailException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
