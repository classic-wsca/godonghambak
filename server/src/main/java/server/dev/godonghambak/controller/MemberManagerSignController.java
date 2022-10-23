package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.SessionConst;
import server.dev.godonghambak.domain.dto.MemberUserDto;
import server.dev.godonghambak.domain.entity.MemberUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;

@Api(tags = {"4. MemberManager_Sign"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/manager/sign")
@CrossOrigin
@Slf4j
public class MemberManagerSignController {

//    @PostMapping("/signup")
//    @ApiOperation(value = "관리자 회원가입", notes = "관리자 회원기입")
//    public ResponseEntity<?> signUp(
//            @ApiParam(value = "관리자 정보", required = true) @RequestBody MemberUserDto.SignUp signUpInfo) throws ParseException {
//
//        MemberUser result = memberUserSignService.signUp(signUpInfo);
//        return ResponseEntity.ok(result);
//    }
//
//    @PostMapping("/signin")
//    @ApiOperation(value = "관리자 로그인", notes = "관리자 로그인")
//    public ResponseEntity<?> signIn(
//            @ApiParam(value = "관리자 정보", required = true) @RequestBody MemberUserDto.SignIn signInInfo, HttpServletRequest request) throws ParseException {
//
//        MemberUser result = memberUserSignService.signIn(signInInfo);
//        if(result != null) {
//            HttpSession session = request.getSession();
//            session.setMaxInactiveInterval(1800); //30분
//            session.setAttribute(SessionConst.LOGIN_MEMBER, result);
//            //세션에 구분할 수 있는 타입을 넣어두자!
//            session.setAttribute(SessionConst.LOGIN_TYPE, "user");
//
//        }
//        return ResponseEntity.ok(result);
//    }

}
