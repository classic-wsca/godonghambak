package server.dev.godonghambak.domain.dto;

import lombok.*;

public class MemberUserDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class SignUp {
        private String member_user_email;
        private String member_user_password;
        private String member_user_name;
        private String member_user_phone;
        private String member_user_birth;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class SignIn{
        private String member_user_email;
        private String member_user_password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class FindEmail{
        private String member_user_name;
        private String member_user_phone;
        private String member_user_birth;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class FindEmailResult{
        private String member_user_email;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class ChangePassword{
        private String member_user_email;
        private String member_user_password;
    }

}
