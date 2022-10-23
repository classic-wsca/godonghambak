package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.dao.StoreDao;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.domain.entity.Store;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;
import server.dev.godonghambak.exceptionhandler.exception.Store.SameStoreException;

import java.util.UUID;

import static server.dev.godonghambak.domain.dto.StoreDto.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {

    private final StoreDao storeDao;

    public Store insert(Insert storeInsert) {

        Store findResult = storeDao.findByName(storeInsert.getStore_name());
        if(findResult != null) throw new SameStoreException();

        Store InsertInfo = Store.builder()
                            .store_id(UUID.randomUUID().toString().replace("-", ""))
                            .store_name(storeInsert.getStore_name())
                            .store_image(storeInsert.getStore_image())
                            .store_contact(storeInsert.getStore_contact())
                            .store_address(storeInsert.getStore_address())
                            .store_businesshours(storeInsert.getStore_businesshours())
                            .store_breaktime(storeInsert.getStore_breaktime())
                            .store_lastorder(storeInsert.getStore_lastorder())
                            .store_parking(storeInsert.isStore_parking())
                            .store_wifi(storeInsert.isStore_wifi())
                            .store_kiosk(storeInsert.isStore_kiosk())
                            .build();

        int insertResult = storeDao.insert(InsertInfo);

        if(insertResult > 0 ) return InsertInfo;
        throw new InternalServerException();
    }
}
