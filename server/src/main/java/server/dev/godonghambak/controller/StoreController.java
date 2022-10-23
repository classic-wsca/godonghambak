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
import server.dev.godonghambak.domain.dto.StoreDto;
import server.dev.godonghambak.domain.dto.StoreDto.Insert;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.domain.entity.Store;
import server.dev.godonghambak.service.StoreService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;

@Api(tags = {"3. Store"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/store")
@CrossOrigin
@Slf4j
public class StoreController {

    private final StoreService storeService;

    @PostMapping("/insert")
    @ApiOperation(value = "매장 추가", notes = "매장 추가")
    public ResponseEntity<?> insert(
            @ApiParam(value = "매장 추가 정보", required = true) @RequestBody Insert storeInsert, HttpServletRequest request) throws ParseException {

        Store result = storeService.insert(storeInsert);
        return ResponseEntity.ok(result);
    }
}
