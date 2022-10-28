package server.dev.godonghambak.domain.dto;

import lombok.*;

import java.sql.Timestamp;

public class MenuDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class TypeResult {
        private String menu_name_kr;
        private String menu_name_en;
        private String menu_type;
        private String menu_description;
        private Integer price;
        private Timestamp create_date;
        private Timestamp delete_date;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class InsertOrUpdateMenuInput {
        private String menu_id;
        private String menu_name_kr;
        private String menu_name_en;
        private String menu_type;
        private String menu_description;
        private Integer price;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class DeleteMenuInput {

        private String menu_id;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class DeleteQueryInfo {

        private String menu_id;
        private String member_manage_id;
    }
}
