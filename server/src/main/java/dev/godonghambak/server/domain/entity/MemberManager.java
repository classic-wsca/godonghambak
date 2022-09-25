package dev.godonghambak.server.domain.entity;

import lombok.*;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberManager {
    private String member_manage_id;
    private String member_manage_email;
    private String member_manage_password;
    private String member_manage_name;
    private String manage_info_id;
    private String menu_id;

}
