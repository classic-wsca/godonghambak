package server.dev.godonghambak.domain.entity;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Menu {

    private String menu_id;
    private String member_manage_id;
    private String menu_name_kr;
    private String menu_name_en;
    private String menu_type;
    private String menu_description;
    private Integer menu_price;
    private Timestamp menu_create_date;
    private Timestamp menu_delete_date;

}
