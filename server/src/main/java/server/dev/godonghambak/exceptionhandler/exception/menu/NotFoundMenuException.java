package server.dev.godonghambak.exceptionhandler.exception.menu;

public class NotFoundMenuException extends RuntimeException {
    public NotFoundMenuException() {
        super();
    }

    public NotFoundMenuException(String message) {
        super(message);
    }

    public NotFoundMenuException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundMenuException(Throwable cause) {
        super(cause);
    }

    protected NotFoundMenuException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
