package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.service.MemberUserSignService;

import java.text.ParseException;

import static server.dev.godonghambak.domain.dto.MemberUserDto.*;

@Api(tags = {"1. MemberUser_Sign"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/sign")
@CrossOrigin
public class MemberUserSignController {

    private final MemberUserSignService memberUserSignService;

    @PostMapping("/signup")
    @ApiOperation(value = "가맹점주 회원가입", notes = "가맹점주 회원기입")
    public ResponseEntity<?> signup(
            @ApiParam(value = "가맹점주 정보", required = true) @RequestBody signUp signUpInfo) throws ParseException {

        MemberUser result = memberUserSignService.signUp(signUpInfo);
        return ResponseEntity.ok(result);
    }
}
