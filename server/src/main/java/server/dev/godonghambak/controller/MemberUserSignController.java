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
            session.setMaxInactiveInterval(1800); //1분
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
}
