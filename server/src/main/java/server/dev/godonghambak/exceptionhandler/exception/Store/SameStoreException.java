package server.dev.godonghambak.exceptionhandler.exception.Store;

public class SameStoreException extends RuntimeException {
    public SameStoreException() {
        super();
    }

    public SameStoreException(String message) {
        super(message);
    }

    public SameStoreException(String message, Throwable cause) {
        super(message, cause);
    }

    public SameStoreException(Throwable cause) {
        super(cause);
    }

    protected SameStoreException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
