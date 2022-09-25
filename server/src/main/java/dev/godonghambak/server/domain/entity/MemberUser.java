package dev.godonghambak.server.domain.entity;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberUser {

    private String member_user_id;
    private String validation_email;
    private String member_user_password;
    private String member_user_name;
    private String member_user_phone;
    private String member_user_birth;
    private String store_id;
    private Timestamp member_user_create_date;
    private Timestamp member_user_delete_date;

}
