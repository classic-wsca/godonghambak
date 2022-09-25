package dev.godonghambak.server.domain.entity;

import lombok.*;

import java.sql.Timestamp;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ManageInfo {
    private String manage_info_id;
    private String manage_info_title;
    private String manage_info_content;
    private String manage_info_image;
    private int manage_info_hits;
    private Timestamp manage_info_create_date;
    private Timestamp manage_info_delete_date;
}
