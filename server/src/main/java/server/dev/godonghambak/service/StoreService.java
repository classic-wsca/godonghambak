package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.dao.StoreDao;
import server.dev.godonghambak.domain.entity.Store;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;
import server.dev.godonghambak.exceptionhandler.exception.Store.NotFoundStoreException;
import server.dev.godonghambak.exceptionhandler.exception.Store.SameStoreException;

import java.util.List;
import java.util.UUID;

import static server.dev.godonghambak.domain.dto.StoreDto.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreService {

    private final StoreDao storeDao;

    public Store selectOne(String storeName) {

        Store findResult = storeDao.findByName(storeName);
        if(findResult == null) throw new NotFoundStoreException();

        return findResult;
    }

    public List<InsertOrUpdateDto> selectList() {
        List<InsertOrUpdateDto> findAllResult = storeDao.findAll();
        return findAllResult;
    }

    public Store insert(InsertOrUpdateDto storeInsertOrUpdateDto) {

        Store findResult = storeDao.findByName(storeInsertOrUpdateDto.getStore_name());
        if(findResult != null) throw new SameStoreException();

        Store InsertInfo = Store.builder()
                            .store_id(UUID.randomUUID().toString().replace("-", ""))
                            .store_name(storeInsertOrUpdateDto.getStore_name())
                            .store_image(storeInsertOrUpdateDto.getStore_image())
                            .store_contact(storeInsertOrUpdateDto.getStore_contact())
                            .store_address(storeInsertOrUpdateDto.getStore_address())
                            .store_businesshours(storeInsertOrUpdateDto.getStore_businesshours())
                            .store_breaktime(storeInsertOrUpdateDto.getStore_breaktime())
                            .store_lastorder(storeInsertOrUpdateDto.getStore_lastorder())
                            .store_parking(storeInsertOrUpdateDto.isStore_parking())
                            .store_wifi(storeInsertOrUpdateDto.isStore_wifi())
                            .store_kiosk(storeInsertOrUpdateDto.isStore_kiosk())
                            .build();

        int insertResult = storeDao.insert(InsertInfo);

        if(insertResult > 0 ) return InsertInfo;
        throw new InternalServerException();
    }

    public Store update(Store storeInfo) {

        int updateResult = storeDao.update(storeInfo);
        if(updateResult > 0 ) return storeInfo;
        throw new InternalServerException();
    }


    public Boolean delete(DeleteDto storeDeleteInfoDto) {

        int deleteResult = storeDao.delete(storeDeleteInfoDto);
        if(deleteResult > 0 ) return true;
        throw new InternalServerException();

    }
}
