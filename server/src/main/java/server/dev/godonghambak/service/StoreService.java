package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.SessionConst;
import server.dev.godonghambak.dao.StoreDao;
import server.dev.godonghambak.domain.entity.MemberManage;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.domain.entity.Store;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;
import server.dev.godonghambak.exceptionhandler.exception.Store.CheckIdException;
import server.dev.godonghambak.exceptionhandler.exception.Store.NotFoundStoreException;
import server.dev.godonghambak.exceptionhandler.exception.Store.SameStoreException;
import server.dev.godonghambak.exceptionhandler.exception.authentication.SessionException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

    public List<InsertDto> selectList() {
        List<InsertDto> findAllResult = storeDao.findAll();
        return findAllResult;
    }

    public List<Store> selectIndividual(String memberUserId) {
        List<Store> byMemberUserId = storeDao.findByMemberUserId(memberUserId);
        if(!byMemberUserId.isEmpty()) return byMemberUserId;
        throw new InternalServerException();
    }

    public Store insert(InsertDto storeInsertDto, HttpServletRequest request) {

        Store findResult = storeDao.findByName(storeInsertDto.getStore_name());
        if(findResult != null) throw new SameStoreException();

        HttpSession session = request.getSession(false);
        MemberUser sessionMemberUser = (MemberUser)session.getAttribute(SessionConst.LOGIN_MEMBER);
        MemberManage sessionMemberManage = (MemberManage)session.getAttribute(SessionConst.LOGIN_MANAGER);

        Store InsertInfo;
        if(sessionMemberManage != null) {
            InsertInfo = Store.builder()
                                    .store_id(UUID.randomUUID().toString().replace("-", ""))
                                    .store_name(storeInsertDto.getStore_name())
                                    .store_image(storeInsertDto.getStore_image())
                                    .store_contact(storeInsertDto.getStore_contact())
                                    .store_address(storeInsertDto.getStore_address())
                                    .store_businesshours(storeInsertDto.getStore_businesshours())
                                    .store_breaktime(storeInsertDto.getStore_breaktime())
                                    .store_lastorder(storeInsertDto.getStore_lastorder())
                                    .store_parking(storeInsertDto.isStore_parking())
                                    .store_wifi(storeInsertDto.isStore_wifi())
                                    .store_kiosk(storeInsertDto.isStore_kiosk())
                                    .build();
        } else{
            InsertInfo = Store.builder()
                                    .store_id(UUID.randomUUID().toString().replace("-", ""))
                                    .member_user_id(sessionMemberUser.getMember_user_id())
                                    .store_name(storeInsertDto.getStore_name())
                                    .store_image(storeInsertDto.getStore_image())
                                    .store_contact(storeInsertDto.getStore_contact())
                                    .store_address(storeInsertDto.getStore_address())
                                    .store_businesshours(storeInsertDto.getStore_businesshours())
                                    .store_breaktime(storeInsertDto.getStore_breaktime())
                                    .store_lastorder(storeInsertDto.getStore_lastorder())
                                    .store_parking(storeInsertDto.isStore_parking())
                                    .store_wifi(storeInsertDto.isStore_wifi())
                                    .store_kiosk(storeInsertDto.isStore_kiosk())
                                    .build();
        }   

        int insertResult = storeDao.insert(InsertInfo);

        if(insertResult > 0) return InsertInfo;
        throw new InternalServerException();
    }

    public Store update(UpdateDto updateDto, HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        MemberUser sessionMemberUser = (MemberUser)session.getAttribute(SessionConst.LOGIN_MEMBER);
        MemberManage sessionMemberManage = (MemberManage)session.getAttribute(SessionConst.LOGIN_MANAGER);

        Store updateInfo;
        int updateResult;

        if(sessionMemberManage != null) {
            updateInfo = Store.builder()
                                    .store_id(updateDto.getStore_id())
                                    .store_name(updateDto.getStore_name())
                                    .store_image(updateDto.getStore_image())
                                    .store_contact(updateDto.getStore_contact())
                                    .store_address(updateDto.getStore_address())
                                    .store_businesshours(updateDto.getStore_businesshours())
                                    .store_breaktime(updateDto.getStore_breaktime())
                                    .store_lastorder(updateDto.getStore_lastorder())
                                    .store_parking(updateDto.isStore_parking())
                                    .store_wifi(updateDto.isStore_wifi())
                                    .store_kiosk(updateDto.isStore_kiosk())
                                    .build();

            updateResult = storeDao.menegeUpdate(updateInfo);

        }else{
            updateInfo = Store.builder()
                                    .store_id(updateDto.getStore_id())
                                    .member_user_id(sessionMemberUser.getMember_user_id())
                                    .store_name(updateDto.getStore_name())
                                    .store_image(updateDto.getStore_image())
                                    .store_contact(updateDto.getStore_contact())
                                    .store_address(updateDto.getStore_address())
                                    .store_businesshours(updateDto.getStore_businesshours())
                                    .store_breaktime(updateDto.getStore_breaktime())
                                    .store_lastorder(updateDto.getStore_lastorder())
                                    .store_parking(updateDto.isStore_parking())
                                    .store_wifi(updateDto.isStore_wifi())
                                    .store_kiosk(updateDto.isStore_kiosk())
                                    .build();

            updateResult = storeDao.userUpdate(updateInfo);

        }

        if(updateResult > 0 ) return updateInfo;
        throw new CheckIdException();
    }


    public Boolean delete(DeleteDto1 deleteDto1, HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        MemberUser sessionMemberUser = (MemberUser)session.getAttribute(SessionConst.LOGIN_MEMBER);

        DeleteDto2 storeDeleteInfo = DeleteDto2.builder()
                                                .store_id(deleteDto1.getStore_id())
                                                .member_user_id(sessionMemberUser.getMember_user_id())
                                                .build();

        int deleteResult = storeDao.delete(storeDeleteInfo);

        if(deleteResult > 0) return true;
        throw new CheckIdException();

    }


}
