package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.service.AuthenticationService;

import javax.mail.MessagingException;

import static server.dev.godonghambak.domain.dto.AuthenticationDto.*;

@Api(tags = {"2. Authentication"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/authentication")
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/send-code")
    @ApiOperation(value = "회원가입, 비밀번호 변경 시 인증 코드 이메일 전송", notes = "이메일 인증을 위한 인증 코드를 이메일로 전송한다.")
    public ResponseEntity<?> sendCode(
            @ApiParam(value = "인증 이메일", required = true) @RequestBody SendEmail sendEmail) throws MessagingException {

        boolean result = authenticationService.sendToEmail(sendEmail);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/check-code")
    @ApiOperation(value = "회원가입, 비밀번호 변경 시 이메일에 전송된 인증 코드 조회", notes = "전송된 인증 코드를 사용해 유효한 이메일인지 확인한다.")
    public ResponseEntity<?> checkCode(
            @ApiParam(value = "이메일", required = true) @RequestParam String email,
            @ApiParam(value = "인증코드", required = true) @RequestParam String code ){

        boolean result = authenticationService.checkCode(email, code);
        return ResponseEntity.ok(result);
    }

}
