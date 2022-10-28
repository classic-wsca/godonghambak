package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.domain.dto.StoreDto.InsertStoreInput;
import server.dev.godonghambak.domain.entity.Store;
import server.dev.godonghambak.service.StoreService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static server.dev.godonghambak.domain.dto.StoreDto.*;

@Api(tags = {"3. Store"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user/store")
@CrossOrigin
@Slf4j
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    @ApiOperation(value = "매장 단일 조회", notes = "매장 단일 조회")
    public ResponseEntity<?> selectOne(
            @ApiParam(value = "매장 이름", required = true) @RequestParam String name) {

        Store result = storeService.selectOne(name);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/list")
    @ApiOperation(value = "모든 매장 조회", notes = "모든 매장 조회")
    public ResponseEntity<?> selectList() {

        List<InsertStoreInput> stores = storeService.selectList();
        return ResponseEntity.ok(stores);
    }

    @GetMapping("/individual")
    @ApiOperation(value = "유저 ID 따른 매장 조회", notes = "유저 ID 따른 매장 조회")
    public ResponseEntity<?> selectIndividual(
            @ApiParam(value = "유저 ID", required = true) @RequestParam String memberUserId) {

        List<Store> stores = storeService.selectIndividual(memberUserId);
        return ResponseEntity.ok(stores);
    }

    @PostMapping
    @ApiOperation(value = "매장 추가", notes = "매장 추가")
    public ResponseEntity<?> insert(
            @ApiParam(value = "매장 추가 정보", required = true) @RequestBody InsertStoreInput storeInsertStoreInput, HttpServletRequest request) {

        Store result = storeService.insert(storeInsertStoreInput, request);
        return ResponseEntity.ok(result);
    }

    @PutMapping
    @ApiOperation(value = "매장 정보 수정", notes = "매장 정보 수정")
    public ResponseEntity<?> update(
            @ApiParam(value = "매장 정보 수정", required = true) @RequestBody UpdateStoreInput updateStoreInput, HttpServletRequest request) {

        Store result = storeService.update(updateStoreInput, request);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    @ApiOperation(value = "매장 정보 삭제", notes = "매장 정보 삭제")
    public ResponseEntity<?> delete(
            @ApiParam(value = "매장 정보 삭제", required = true) @RequestBody DeleteStoreInput storeDeleteInfoDto, HttpServletRequest request) {

        Boolean result = storeService.delete(storeDeleteInfoDto, request);
        return ResponseEntity.ok(result);
    }
}
