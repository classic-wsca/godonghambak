package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.dao.MemberUserDao;
import server.dev.godonghambak.exceptionhandler.exception.InternalServerException;
import server.dev.godonghambak.exceptionhandler.exception.memberusersign.NoMatchPasswordException;
import server.dev.godonghambak.exceptionhandler.exception.memberusersign.NoSearchEmailException;
import server.dev.godonghambak.exceptionhandler.exception.memberusersign.SameEmailException;

import java.util.UUID;

import static server.dev.godonghambak.domain.dto.MemberUserDto.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberUserSignService {

    private final MemberUserDao memberUserRepository;

    private final PasswordEncoder passwordEncoder;

    public MemberUser signUp(SignUp signUpinfo){

        //회원가입 하고자 하는 아이디 확인 중복확인 후 예외처리
        MemberUser byEmail = memberUserRepository.findByEmail(signUpinfo.getMember_user_email());
        if(byEmail != null) throw new SameEmailException();

        //패스워드 인코딩
        String encodePassword = passwordEncoder.encode(signUpinfo.getMember_user_password());

        MemberUser newMember = MemberUser
                                .builder()
                                .member_user_id(UUID.randomUUID().toString().replace("-", ""))
                                .member_user_email(signUpinfo.getMember_user_email())
                                .member_user_password(encodePassword)
                                .member_user_name(signUpinfo.getMember_user_name())
                                .member_user_phone(signUpinfo.getMember_user_phone())
                                .member_user_birth(signUpinfo.getMember_user_birth())
                                .build();

        int result = memberUserRepository.insert(newMember);
        if(result > 0) {
            return newMember;
        }

        //default 예외처리
        throw new InternalServerException();
    }

    public MemberUser signIn(SignIn signInInfo) {

        MemberUser result = memberUserRepository.findByEmail(signInInfo.getMember_user_email());

        //패스워드 확인
        boolean passwordResult = passwordEncoder.matches(signInInfo.getMember_user_password(), result.getMember_user_password());
//        boolean passwordResult = passwordEncoder.matches(result.getMember_user_password(), signInInfo.getMember_user_password());

        if(passwordResult && result != null) {
            return result;
        }

        //비밀번호가 맞지 않다는 예외처리
        throw new NoMatchPasswordException();
    }

    public FindEmailResult findEmail(String name, String phone, String birth) {

        FindEmail findEmail = FindEmail.builder()
                                        .member_user_name(name)
                                        .member_user_phone(phone)
                                        .member_user_birth(birth)
                                        .build();

        FindEmailResult findEmailResult = memberUserRepository.findEmail(findEmail);

        if(findEmailResult != null) {
            return findEmailResult;
        }

        //아이디 못찾았다는 예외처리
        throw new NoSearchEmailException();
    }

    public boolean changePassword(ChangePassword changePassword) {
        int updateResult = memberUserRepository.updatePassword(changePassword);
        if(updateResult > 0) return true;

        //default 예외처리
        throw new InternalServerException();
    }
}
