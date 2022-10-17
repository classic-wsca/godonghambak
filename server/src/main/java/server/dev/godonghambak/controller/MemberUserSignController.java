package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.SessionConst;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.service.MemberUserSignService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Member;
import java.text.ParseException;

import static server.dev.godonghambak.domain.dto.MemberUserDto.*;

@Api(tags = {"1. MemberUser_Sign"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/sign")
@CrossOrigin
@Slf4j
public class MemberUserSignController {

    private final MemberUserSignService memberUserSignService;

    @GetMapping("/")
    public MemberUser signInCheck(HttpServletRequest request) {
      log.debug("test!!!!!!");
      return null;
    }

    @PostMapping("/signup")
    @ApiOperation(value = "가맹점주 회원가입", notes = "가맹점주 회원기입")
    public ResponseEntity<?> signUp(
            @ApiParam(value = "가맹점주 정보", required = true) @RequestBody SignUp signUpInfo) throws ParseException {

        MemberUser result = memberUserSignService.signUp(signUpInfo);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/signin")
    @ApiOperation(value = "가맹점주 로그인", notes = "가맹점주 로그인")
    public ResponseEntity<?> signIn(
            @ApiParam(value = "가맹점주 정보", required = true) @RequestBody SignIn signInInfo, HttpServletRequest request) throws ParseException {

        MemberUser result = memberUserSignService.signIn(signInInfo);
        if(result != null) {
            HttpSession session = request.getSession();
            session.setMaxInactiveInterval(1800); //30분
            session.setAttribute(SessionConst.LOGIN_MEMBER, result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/signout")
    @ApiOperation(value = "가맹점주 로그아웃", notes = "해당 API 호출 시 세션 만료")
    public ResponseEntity<?> signOut(
            HttpServletRequest request) throws ParseException {

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok(true);
    }

    @GetMapping("/find-email")
    @ApiOperation(value = "이메일 찾기", notes = "이름, 전화번호, 생년월일을 통해서 조회한다.")
    public ResponseEntity<?> checkCode(
            @ApiParam(value = "이름", required = true) @RequestParam String name,
            @ApiParam(value = "전화번호", required = true) @RequestParam String phone,
            @ApiParam(value = "생년월일", required = true) @RequestParam String birth ){

        FindEmailResult findEmailResult = memberUserSignService.findEmail(name, phone, birth);
        return ResponseEntity.ok(findEmailResult);
    }

    @PutMapping("/password")
    @ApiOperation(value = "비밀번호 변경", notes = "이메일 인증 후 비밀번호를 변경한다.")
    public ResponseEntity<?> updatePassword(
            @ApiParam(value = "변경할 비밀번호", required = true) @RequestBody ChangePassword changePassword){

        boolean changeResult = memberUserSignService.changePassword(changePassword);
        return ResponseEntity.ok(changeResult);
    }
}
