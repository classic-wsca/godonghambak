package server.dev.godonghambak.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import server.dev.godonghambak.SessionConst;
import server.dev.godonghambak.exceptionhandler.exception.authentication.SessionException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String requestURI = request.getRequestURI();
        log.info("인증 체크 인터셉터 실행 {}", requestURI);

        HttpSession session = request.getSession(false);
        if (session == null ||
                        (session.getAttribute(SessionConst.LOGIN_MEMBER) == null
                            && session.getAttribute(SessionConst.LOGIN_MANAGER) == null)) {
            log.info("미인증 사용자 요청");
            throw new SessionException();
        }

        return true;
    }
}
