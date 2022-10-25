package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.domain.entity.MemberManage;
import server.dev.godonghambak.service.MemberManageService;

import static server.dev.godonghambak.domain.dto.MemberManageDto.*;

@Api(tags = {"4. MemberManager_Sign"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/manager/sign")
@CrossOrigin
@Slf4j
public class MemberManagerSignController {

    private final MemberManageService memberManageService;

    @PostMapping("/signup")
    @ApiOperation(value = "관리자 회원가입", notes = "관리자 회원기입")
    public ResponseEntity<?> signUp(
            @ApiParam(value = "관리자 정보", required = true) @RequestBody MSignUp signUpInfo){

        MemberManage result = memberManageService.signUp(signUpInfo);
        return ResponseEntity.ok(result);
    }

//    @PostMapping("/signin")
//    @ApiOperation(value = "관리자 로그인", notes = "관리자 로그인")
//    public ResponseEntity<?> signIn(
//            @ApiParam(value = "관리자 정보", required = true) @RequestBody MemberUserDto.SignIn signInInfo, HttpServletRequest request) throws ParseException {
//
//        MemberUser result = memberManageService.signIn(signInInfo);
//        if(result != null) {
//            HttpSession session = request.getSession();
//            session.setMaxInactiveInterval(1800); //30분
//            session.setAttribute(SessionConst.LOGIN_MEMBER, result);
//
//        }
//        return ResponseEntity.ok(result);
//    }
//
//    @PostMapping("/signout")
//    @ApiOperation(value = "관리자 로그아웃", notes = "해당 API 호출 시 세션 만료")
//    public ResponseEntity<?> signOut(
//            HttpServletRequest request) throws ParseException {
//
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.invalidate();
//        }
//        return ResponseEntity.ok(true);
//    }

}
