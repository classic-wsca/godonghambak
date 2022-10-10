package server.dev.godonghambak.domain.entity;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Authentication {
    private String authentication_email;
    private String authentication_code;
    private Timestamp authentication_expiration;
}
