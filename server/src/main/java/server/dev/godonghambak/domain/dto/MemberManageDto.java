package server.dev.godonghambak.domain.dto;

import lombok.*;

public class MemberManageDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class MSignUp {
        private String member_manage_email;
        private String member_manage_password;
        private String member_manage_name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class MSignIn {
        private String member_manage_email;
        private String member_manage_password;
    }
}
