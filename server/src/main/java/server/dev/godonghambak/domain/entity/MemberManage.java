package server.dev.godonghambak.domain.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class MemberManage {
    private String member_manage_id;
    private String member_manage_email;
    private String member_manage_password;
    private String member_manage_name;
    private String manage_info_id;
    private String menu_id;

}
