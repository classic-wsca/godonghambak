package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.dao.MemberManagerDao;
import server.dev.godonghambak.domain.entity.MemberManage;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;
import server.dev.godonghambak.exceptionhandler.exception.NoMatchEmailOrPasswordException;
import server.dev.godonghambak.exceptionhandler.exception.memberusersign.SameEmailException;

import java.util.UUID;

import static server.dev.godonghambak.domain.dto.MemberManageDto.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberManageService {

    private final MemberManagerDao memberManagerDao;
    private final PasswordEncoder passwordEncoder;

    public MemberManage signUp(MSignUp signUpinfo){

        //회원가입 하고자 하는 아이디 확인 중복확인 후 예외처리
        MemberManage byEmail = memberManagerDao.findByEmail(signUpinfo.getMember_manage_email());
        if(byEmail != null) throw new SameEmailException();

        //패스워드 인코딩
        String encodePassword = passwordEncoder.encode(signUpinfo.getMember_manage_password());

        MemberManage newMember = MemberManage
                                    .builder()
                                    .member_manage_id(UUID.randomUUID().toString().replace("-", ""))
                                    .member_manage_email(signUpinfo.getMember_manage_email())
                                    .member_manage_password(encodePassword)
                                    .member_manage_name(signUpinfo.getMember_manage_name())
                                    .build();

        int result = memberManagerDao.insert(newMember);
        if(result > 0) {
            return newMember;
        }

        //default 예외처리
        throw new InternalServerException();
    }

    public MemberManage signIn(MSignIn signInInfo) {

        MemberManage result = memberManagerDao.findByEmail(signInInfo.getMember_manage_email());
        if(result == null) throw new NoMatchEmailOrPasswordException();

        //패스워드 확인
        boolean passwordResult = passwordEncoder.matches(signInInfo.getMember_manage_password(), result.getMember_manage_password());
//        boolean passwordResult = passwordEncoder.matches(result.getMember_user_password(), signInInfo.getMember_user_password());
        if(passwordResult) return result;

        //비밀번호가 맞지 않다는 예외처리
        throw new NoMatchEmailOrPasswordException();
    }
}
