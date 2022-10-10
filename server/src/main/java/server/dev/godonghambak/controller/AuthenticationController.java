package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.service.AuthenticationService;

import javax.mail.MessagingException;

import static server.dev.godonghambak.domain.dto.AuthenticationDto.*;

@Api(tags = {"2. Authentication"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/Authentication")
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/send-code")
    @ApiOperation(value = "인증 코드 이메일 전송", notes = "이메일 인증을 위한 인증 코드를 이메일로 전송한다.")
    public ResponseEntity<?> emailValidationForSignUp(
            @ApiParam(value = "인증 이메일", required = true) @RequestBody SendEmail sendEmail) throws MessagingException {

        boolean result = authenticationService.sendToEmail(sendEmail);
        return ResponseEntity.ok(result);
    }
}
