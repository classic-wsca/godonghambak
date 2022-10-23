package server.dev.godonghambak.domain.dto;

import lombok.*;

public class StoreDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    @Builder
    public static class Insert {

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
}
