package server.dev.godonghambak.domain.dto;

import lombok.*;

public class AuthenticationDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class SendEmail {
        private String authentication_email;
    }
}
