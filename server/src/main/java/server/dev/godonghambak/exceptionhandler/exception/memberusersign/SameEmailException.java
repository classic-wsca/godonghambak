package server.dev.godonghambak.exceptionhandler.exception.memberusersign;

public class SameEmailException extends RuntimeException {
    public SameEmailException() {
        super();
    }

    public SameEmailException(String message) {
        super(message);
    }

    public SameEmailException(String message, Throwable cause) {
        super(message, cause);
    }

    public SameEmailException(Throwable cause) {
        super(cause);
    }

    protected SameEmailException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
