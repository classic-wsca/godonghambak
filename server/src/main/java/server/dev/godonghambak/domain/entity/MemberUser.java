package server.dev.godonghambak.domain.entity;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MemberUser {

    private String member_user_id;
    private String member_user_email;
    private String member_user_password;
    private String member_user_name;
    private String member_user_phone;
    private String member_user_birth;
    private Timestamp member_user_create_date;
    private Timestamp member_user_delete_date;

}
