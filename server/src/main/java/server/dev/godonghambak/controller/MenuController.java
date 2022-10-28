package server.dev.godonghambak.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.dev.godonghambak.domain.entity.Menu;
import server.dev.godonghambak.service.MenuService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static server.dev.godonghambak.domain.dto.MenuDto.*;

@Api(tags = {"5. Menu"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/manage/menu")
@CrossOrigin
@Slf4j
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    @ApiOperation(value = "메뉴 단일 조회", notes = "메뉴 단일 조회")
    public ResponseEntity<?> selectOne(
            @ApiParam(value = "메뉴 이름", required = true) @RequestParam String name) {

        Menu result = menuService.selectOne(name);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/type")
    @ApiOperation(value = "메뉴 타입별 조회", notes = "TYPE : 1.세트메뉴, 2.함박메뉴, 3.특별한메뉴, 4.추가메뉴, 5.주류/음료")
    public ResponseEntity<?> selectType(
            @ApiParam(value = "메뉴 타입", required = true) @RequestParam String type){

        List<TypeResult> menus = menuService.selectType(type);
        return ResponseEntity.ok(menus);
    }

    @PostMapping
    @ApiOperation(value = "메뉴 추가", notes = "TYPE : 1.세트메뉴, 2.함박메뉴, 3.특별한메뉴, 4.추가메뉴, 5.주류/음료")
    public ResponseEntity<?> insert(
            @ApiParam(value = "메뉴 추가 정보", required = true) @RequestBody InsertOrUpdateMenuInput menuInsertInput, HttpServletRequest request) {

        Menu result = menuService.insert(menuInsertInput, request);
        return ResponseEntity.ok(result);
    }

    @PutMapping
    @ApiOperation(value = "메뉴 정보 수정", notes = "TYPE : 1.세트메뉴, 2.함박메뉴, 3.특별한메뉴, 4.추가메뉴, 5.주류/음료")
    public ResponseEntity<?> update(
            @ApiParam(value = "메뉴 정보 수정", required = true) @RequestBody InsertOrUpdateMenuInput menuUpdateInput, HttpServletRequest request) {

        InsertOrUpdateMenuInput result = menuService.update(menuUpdateInput, request);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping
    @ApiOperation(value = "메뉴 정보 삭제", notes = "메뉴 정보 삭제")
    public ResponseEntity<?> delete(
            @ApiParam(value = "메뉴 정보 삭제", required = true) @RequestBody DeleteMenuInput deleteMenuInput, HttpServletRequest request) {

        Boolean result = menuService.delete(deleteMenuInput, request);
        return ResponseEntity.ok(result);
    }
}
