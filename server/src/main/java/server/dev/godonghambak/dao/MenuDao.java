package server.dev.godonghambak.dao;

import org.apache.ibatis.annotations.*;
import server.dev.godonghambak.domain.entity.Menu;

import java.util.List;

import static server.dev.godonghambak.domain.dto.MenuDto.*;

@Mapper
public interface MenuDao {

    @Select("SELECT * FROM menu WHERE menu_name_kr = #{menu_name_kr}")
    public Menu findByKrName(String menu_name_kr);

    @Select("SELECT * FROM menu WHERE menu_id = #{menu_id}")
    public Menu findById(String menu_id);

    @Select("SELECT * FROM menu WHERE menu_type = #{menu_type}")
    public List<TypeResult> findByType(String menu_type);

    @Insert("INSERT INTO menu " +
            "VALUES(#{menu_id}, #{member_manage_id}, #{menu_name_kr}, #{menu_name_en}," +
            "#{menu_type}, #{menu_description}, #{menu_price}, now(), null)")
    public int insert(Menu menuInsertInfo);

    @Update("UPDATE menu SET menu_name_kr = #{menu_name_kr}, " +
            "menu_name_en = #{menu_name_en}, " +
            "menu_type = #{menu_type}, " +
            "menu_description = #{menu_description}, " +
            "menu_price = #{menu_price} " +
            "WHERE menu_id = #{menu_id} AND member_manage_id = #{member_manage_id}")
    public int update(Menu menuInsertInfo);

    @Delete("DELETE FROM menu "
            + "WHERE menu_id = #{menu_id} AND member_manage_id = #{member_manage_id}")
    public int Delete(DeleteQueryInfo deleteInfo);
}
