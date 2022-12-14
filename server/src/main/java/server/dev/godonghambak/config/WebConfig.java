package server.dev.godonghambak.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import server.dev.godonghambak.interceptor.LogInterceptor;
import server.dev.godonghambak.interceptor.LoginCheckInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    String[] excludePathPatterns = {"/swagger-ui/**", "/swagger-resources/**", "/v2/api-docs",
            "/api/v1/user/sign/signup", "/api/v1/user/sign/signin", "/api/v1/user/sign/signout", "/api/v1/user/sign/find-email", "/api/v1/user/sign/password",
            "/api/v1/authentication/send-code", "/api/v1/authentication/check-code",
            "/api/v1/user/store/**", "/api/v1/user/store/individual", "/api/v1/user/store/list",
            "/api/v1/manager/sign/signup", "/api/v1/manager/sign/signin", "/api/v1/manager/sign/signout",
            "/api/v1/manage/menu", "/api/v1/manage/menu/type"
    };

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**");


        registry.addInterceptor(new LoginCheckInterceptor())
                .order(2)
                .excludePathPatterns(excludePathPatterns)
                .addPathPatterns("/**");
    }
}
