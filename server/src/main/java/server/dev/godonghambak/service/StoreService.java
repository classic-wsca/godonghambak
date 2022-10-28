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

    public List<InsertStoreInput> selectList() {
        List<InsertStoreInput> findAllResult = storeDao.findAll();
        return findAllResult;
    }

    public List<Store> selectIndividual(String memberUserId) {
        List<Store> byMemberUserId = storeDao.findByMemberUserId(memberUserId);
        if(!byMemberUserId.isEmpty()) return byMemberUserId;
        throw new InternalServerException();
    }

    public Store insert(InsertStoreInput storeInsertStoreInput, HttpServletRequest request) {

        Store findResult = storeDao.findByName(storeInsertStoreInput.getStore_name());
        if(findResult != null) throw new SameStoreException();

        HttpSession session = request.getSession(false);
        MemberUser sessionMemberUser = (MemberUser)session.getAttribute(SessionConst.LOGIN_MEMBER);
        MemberManage sessionMemberManage = (MemberManage)session.getAttribute(SessionConst.LOGIN_MANAGER);

        Store InsertInfo;
        if(sessionMemberManage != null) {
            InsertInfo = Store.builder()
                                    .store_id(UUID.randomUUID().toString().replace("-", ""))
                                    .member_manage_id(sessionMemberManage.getMember_manage_id())
                                    .store_name(storeInsertStoreInput.getStore_name())
                                    .store_image(storeInsertStoreInput.getStore_image())
                                    .store_contact(storeInsertStoreInput.getStore_contact())
                                    .store_address(storeInsertStoreInput.getStore_address())
                                    .store_businesshours(storeInsertStoreInput.getStore_businesshours())
                                    .store_breaktime(storeInsertStoreInput.getStore_breaktime())
                                    .store_lastorder(storeInsertStoreInput.getStore_lastorder())
                                    .store_parking(storeInsertStoreInput.isStore_parking())
                                    .store_wifi(storeInsertStoreInput.isStore_wifi())
                                    .store_kiosk(storeInsertStoreInput.isStore_kiosk())
                                    .build();
        } else{
            InsertInfo = Store.builder()
                                    .store_id(UUID.randomUUID().toString().replace("-", ""))
                                    .member_user_id(sessionMemberUser.getMember_user_id())
                                    .store_name(storeInsertStoreInput.getStore_name())
                                    .store_image(storeInsertStoreInput.getStore_image())
                                    .store_contact(storeInsertStoreInput.getStore_contact())
                                    .store_address(storeInsertStoreInput.getStore_address())
                                    .store_businesshours(storeInsertStoreInput.getStore_businesshours())
                                    .store_breaktime(storeInsertStoreInput.getStore_breaktime())
                                    .store_lastorder(storeInsertStoreInput.getStore_lastorder())
                                    .store_parking(storeInsertStoreInput.isStore_parking())
                                    .store_wifi(storeInsertStoreInput.isStore_wifi())
                                    .store_kiosk(storeInsertStoreInput.isStore_kiosk())
                                    .build();
        }

        int insertResult = storeDao.insert(InsertInfo);

        if(insertResult > 0) return InsertInfo;
        throw new InternalServerException();
    }

    public Store update(UpdateStoreInput updateStoreInput, HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        MemberUser sessionMemberUser = (MemberUser)session.getAttribute(SessionConst.LOGIN_MEMBER);
        MemberManage sessionMemberManage = (MemberManage)session.getAttribute(SessionConst.LOGIN_MANAGER);

        Store updateInfo;
        int updateResult;

        if(sessionMemberManage != null) {
            updateInfo = Store.builder()
                                    .store_id(updateStoreInput.getStore_id())
                                    .store_name(updateStoreInput.getStore_name())
                                    .store_image(updateStoreInput.getStore_image())
                                    .store_contact(updateStoreInput.getStore_contact())
                                    .store_address(updateStoreInput.getStore_address())
                                    .store_businesshours(updateStoreInput.getStore_businesshours())
                                    .store_breaktime(updateStoreInput.getStore_breaktime())
                                    .store_lastorder(updateStoreInput.getStore_lastorder())
                                    .store_parking(updateStoreInput.isStore_parking())
                                    .store_wifi(updateStoreInput.isStore_wifi())
                                    .store_kiosk(updateStoreInput.isStore_kiosk())
                                    .build();

            updateResult = storeDao.manageUpdate(updateInfo);

        }else{
            updateInfo = Store.builder()
                                    .store_id(updateStoreInput.getStore_id())
                                    .member_user_id(sessionMemberUser.getMember_user_id())
                                    .store_name(updateStoreInput.getStore_name())
                                    .store_image(updateStoreInput.getStore_image())
                                    .store_contact(updateStoreInput.getStore_contact())
                                    .store_address(updateStoreInput.getStore_address())
                                    .store_businesshours(updateStoreInput.getStore_businesshours())
                                    .store_breaktime(updateStoreInput.getStore_breaktime())
                                    .store_lastorder(updateStoreInput.getStore_lastorder())
                                    .store_parking(updateStoreInput.isStore_parking())
                                    .store_wifi(updateStoreInput.isStore_wifi())
                                    .store_kiosk(updateStoreInput.isStore_kiosk())
                                    .build();

            updateResult = storeDao.userUpdate(updateInfo);

        }

        if(updateResult > 0 ) return updateInfo;
        throw new CheckIdException();
    }


    public Boolean delete(DeleteStoreInput deleteStoreInput, HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        MemberUser sessionMemberUser = (MemberUser)session.getAttribute(SessionConst.LOGIN_MEMBER);
        MemberManage sessionMemberManage = (MemberManage)session.getAttribute(SessionConst.LOGIN_MANAGER);

        DeleteQueryInfo storeDeleteInfo;
        int deleteResult;
        if (sessionMemberManage != null) {
            storeDeleteInfo = DeleteQueryInfo.builder()
                                            .store_id(deleteStoreInput.getStore_id())
                                            .member_manage_id(sessionMemberManage.getManage_info_id())
                                            .build();
            deleteResult = storeDao.manageDelete(storeDeleteInfo);

        } else {
            storeDeleteInfo = DeleteQueryInfo.builder()
                                            .store_id(deleteStoreInput.getStore_id())
                                            .member_user_id(sessionMemberUser.getMember_user_id())
                                            .build();
            deleteResult = storeDao.userDelete(storeDeleteInfo);
        }

        if(deleteResult > 0) return true;
        throw new CheckIdException();

    }


}
