package server.dev.godonghambak.exceptionhandler.exception.Store;

public class CheckIdException extends RuntimeException {
    public CheckIdException() {
        super();
    }

    public CheckIdException(String message) {
        super(message);
    }

    public CheckIdException(String message, Throwable cause) {
        super(message, cause);
    }

    public CheckIdException(Throwable cause) {
        super(cause);
    }

    protected CheckIdException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
