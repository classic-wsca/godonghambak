package server.dev.godonghambak.domain.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Store {

    private String store_id;
    private String member_user_id;
    private String member_manage_id;
    private String store_name;
    private String store_image;
    private String store_contact;
    private String store_address;
    private String store_businesshours;
    private String store_breaktime;
    private String store_lastorder;
    private boolean store_parking;
    private boolean store_wifi;
    private boolean store_kiosk;
}
