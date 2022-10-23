package server.dev.godonghambak.exceptionhandler.exception.memberusersign;

public class NoSearchEmail extends RuntimeException {
    public NoSearchEmail() {
        super();
    }

    public NoSearchEmail(String message) {
        super(message);
    }

    public NoSearchEmail(String message, Throwable cause) {
        super(message, cause);
    }

    public NoSearchEmail(Throwable cause) {
        super(cause);
    }

    protected NoSearchEmail(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
