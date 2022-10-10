package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.repository.MemberUserRepository;

import java.util.UUID;

import static server.dev.godonghambak.domain.dto.MemberUserDto.*;

@Service
@RequiredArgsConstructor
public class MemberUserSignService {

    private final MemberUserRepository memberUserRepository;

    public MemberUser signUp(SignUp signUpinfo){

        MemberUser newMember = MemberUser
                                .builder()
                                .member_user_id(UUID.randomUUID().toString().replace("-", ""))
                                .member_user_email(signUpinfo.getMember_user_email())
                                .member_user_password(signUpinfo.getMember_user_password())
                                .member_user_name(signUpinfo.getMember_user_name())
                                .member_user_phone(signUpinfo.getMember_user_phone())
                                .member_user_birth(signUpinfo.getMember_user_birth())
                                .build();


        int result = memberUserRepository.insert(newMember);
        if(result > 0) {
            return newMember;
        }

        return null;
    }

    public MemberUser signIn(SignIn signInInfo) {

        MemberUser result = memberUserRepository.findByEmailAndPassword(signInInfo);
        if(result != null) {
            return result;
        }
        return null;
    }

    public FindEmailResult findEmail(String name, String phone, String birth) {

        FindEmail findEmail = FindEmail.builder()
                                        .member_user_name(name)
                                        .member_user_phone(phone)
                                        .member_user_birth(birth)
                                        .build();

        FindEmailResult findEmailResult = memberUserRepository.findEmail(findEmail);
        return findEmailResult;
    }
}
