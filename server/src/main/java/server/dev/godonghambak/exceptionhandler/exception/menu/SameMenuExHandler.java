package server.dev.godonghambak.exceptionhandler.exception.menu;

public class SameMenuExHandler extends RuntimeException {
    public SameMenuExHandler() {
        super();
    }

    public SameMenuExHandler(String message) {
        super(message);
    }

    public SameMenuExHandler(String message, Throwable cause) {
        super(message, cause);
    }

    public SameMenuExHandler(Throwable cause) {
        super(cause);
    }

    protected SameMenuExHandler(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
