package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.domain.dto.MemberUserDto;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.repository.MemberUserRepository;

import java.text.ParseException;
import java.util.UUID;

import static server.dev.godonghambak.domain.dto.MemberUserDto.*;

@Service
@RequiredArgsConstructor
public class MemberUserSignService {

    private final MemberUserRepository memberUserRepository;

    public MemberUser signUp(signUp signUpinfo){

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
}
