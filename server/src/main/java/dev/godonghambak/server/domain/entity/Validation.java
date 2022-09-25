package dev.godonghambak.server.domain.entity;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Validation {

    private String validation_email;
    private String validation_code;
    private Timestamp validation_expiration;

}
