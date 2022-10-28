package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.SessionConst;
import server.dev.godonghambak.dao.MenuDao;
import server.dev.godonghambak.domain.entity.MemberManage;
import server.dev.godonghambak.domain.entity.Menu;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;
import server.dev.godonghambak.exceptionhandler.exception.authentication.SessionException;
import server.dev.godonghambak.exceptionhandler.exception.menu.NotFoundMenuException;
import server.dev.godonghambak.exceptionhandler.exception.menu.SameMenuExHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.UUID;

import static server.dev.godonghambak.domain.dto.MenuDto.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuService {
    private final MenuDao menuDao;

    public Menu selectOne(String menuName) {

        Menu findResult = menuDao.findByKrName(menuName);
        if(findResult == null) throw new NotFoundMenuException();

        return findResult;
    }

    public List<TypeResult> selectType(String menuType) {

        List<TypeResult> findTypeResult = menuDao.findByType(menuType);
        if(findTypeResult == null) throw new NotFoundMenuException();
        return findTypeResult;

    }

    public Menu insert(InsertOrUpdateMenuInput menuInsertDto, HttpServletRequest request) {

        //admin 계정인지 검증
        MemberManage sessionMemberManage = checkMemberManager(request);

        Menu findResult = menuDao.findByKrName(menuInsertDto.getMenu_name_kr());
        if(findResult != null) throw new SameMenuExHandler();

        Menu menuInsertInfo = Menu.builder()
                                        .menu_id(UUID.randomUUID().toString().replace("-", ""))
                                        .member_manage_id(sessionMemberManage.getMember_manage_id())
                                        .menu_name_kr(menuInsertDto.getMenu_name_kr())
                                        .menu_name_en(menuInsertDto.getMenu_name_en())
                                        .menu_type(menuInsertDto.getMenu_type())
                                        .menu_description(menuInsertDto.getMenu_description())
                                        .menu_price(menuInsertDto.getPrice())
                                        .build();

        int menuInsertResult = menuDao.insert(menuInsertInfo);
        if(menuInsertResult > 0) return menuInsertInfo;
        throw new InternalServerException();
    }

    public InsertOrUpdateMenuInput update(InsertOrUpdateMenuInput menuUpdateInput, HttpServletRequest request) {

        //admin 계정인지 검증
        MemberManage sessionMemberManage = checkMemberManager(request);

        //해당 menu_id 값이 존재하는지 검증
        Menu findResult = menuDao.findById(menuUpdateInput.getMenu_id());
        if(findResult == null) throw new NotFoundMenuException();

        Menu menuInsertInfo = Menu.builder()
                                        .menu_id(findResult.getMenu_id())
                                        .member_manage_id(sessionMemberManage.getMember_manage_id())
                                        .menu_name_kr(menuUpdateInput.getMenu_name_kr())
                                        .menu_name_en(menuUpdateInput.getMenu_name_en())
                                        .menu_type(menuUpdateInput.getMenu_type())
                                        .menu_description(menuUpdateInput.getMenu_description())
                                        .menu_price(menuUpdateInput.getPrice())
                                        .build();

        int updateResult = menuDao.update(menuInsertInfo);
        if(updateResult > 0) return menuUpdateInput;
        throw new InternalServerException();

    }

    public Boolean delete(DeleteMenuInput deleteMenuInput, HttpServletRequest request) {

        //admin 계정인지 검증
        MemberManage sessionMemberManage = checkMemberManager(request);

        //해당 menu_id 값이 존재하는지 검증
        Menu findResult = menuDao.findById(deleteMenuInput.getMenu_id());
        if(findResult == null) throw new NotFoundMenuException();

        DeleteQueryInfo deleteQueryInfo = DeleteQueryInfo.builder()
                                                                .menu_id(deleteMenuInput.getMenu_id())
                                                                .member_manage_id(sessionMemberManage.getMember_manage_id())
                                                                .build();

        int deleteResult = menuDao.Delete(deleteQueryInfo);
        if(deleteResult > 0) return true;
        throw new InternalServerException();
    }

    private MemberManage checkMemberManager(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        MemberManage sessionMemberManage = (MemberManage)session.getAttribute(SessionConst.LOGIN_MANAGER);

        //관리자 사용 API 는 특히 민감하기 때문에 매 API 마다 인증을 해주어야 한다.
        if(sessionMemberManage != null) return sessionMemberManage;
        throw new SessionException();
    }

}
