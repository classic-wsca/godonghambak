package dev.godonghambak.server.domain.entity;

import lombok.*;

import java.sql.Timestamp;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Menu {
    private String menu_id;
    private String menu_name_kr;
    private String menu_name_en;
    private String menu_type;
    private String menu_description;
    private int menu_price;
    private Timestamp menu_create_date;
    private Timestamp menu_delete_date;

}
