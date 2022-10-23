package server.dev.godonghambak.exceptionhandler.exception.Store;

public class NotFoundStoreException extends RuntimeException {
    public NotFoundStoreException() {
        super();
    }

    public NotFoundStoreException(String message) {
        super(message);
    }

    public NotFoundStoreException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundStoreException(Throwable cause) {
        super(cause);
    }

    protected NotFoundStoreException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
