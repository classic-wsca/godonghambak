package server.dev.godonghambak.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import server.dev.godonghambak.domain.entity.Store;

import java.util.List;

import static server.dev.godonghambak.domain.dto.StoreDto.*;

@Mapper
public interface StoreDao {
    @Select("SELECT * FROM store WHERE store_name = #{store_name}")
    public Store findByName(String store_name);

    @Select("SELECT * FROM store WHERE member_user_id = #{member_user_id}")
    public List<Store> findByMemberUserId(String member_user_id);

    @Select("SELECT store_name, "
            + "store_image,"
            + "store_contact,"
            + "store_address,"
            + "store_businesshours,"
            + "store_breaktime,"
            + "store_lastorder,"
            + "store_parking,"
            + "store_wifi,"
            + "store_kiosk "
            + "FROM store ORDER BY store_id DESC")
    public List<InsertStoreInput> findAll();

    @Insert("INSERT INTO store VALUES "
            + "(#{store_id}, #{member_user_id}, #{member_manage_id}, #{store_name}, #{store_image}, #{store_contact}, #{store_address}, #{store_businesshours},"
            + "#{store_breaktime}, #{store_lastorder}, #{store_parking}, #{store_wifi}, #{store_kiosk})")
    public int insert(Store insertInfo);

    @Update("UPDATE store SET store_name = #{store_name}, "
            + "store_image = #{store_image},"
            + "store_contact = #{store_contact},"
            + "store_address = #{store_address},"
            + "store_businesshours = #{store_businesshours},"
            + "store_breaktime = #{store_breaktime},"
            + "store_lastorder = #{store_lastorder},"
            + "store_parking = #{store_parking},"
            + "store_wifi = #{store_wifi},"
            + "store_kiosk = #{store_kiosk} "
            + "WHERE store_id = #{store_id} AND member_user_id = #{member_user_id}")
    public int userUpdate(Store updateInfo);

    @Update("UPDATE store SET store_name = #{store_name}, "
            + "store_image = #{store_image},"
            + "store_contact = #{store_contact},"
            + "store_address = #{store_address},"
            + "store_businesshours = #{store_businesshours},"
            + "store_breaktime = #{store_breaktime},"
            + "store_lastorder = #{store_lastorder},"
            + "store_parking = #{store_parking},"
            + "store_wifi = #{store_wifi},"
            + "store_kiosk = #{store_kiosk} "
            + "WHERE store_id = #{store_id}")
    public int manageUpdate(Store updateInfo);

    @Delete("DELETE FROM store "
            + "WHERE store_id = #{store_id} AND member_user_id = #{member_user_id}")
    public int userDelete(DeleteQueryInfo deleteInfo);

    @Delete("DELETE FROM store "
            + "WHERE store_id = #{store_id}")
    public int manageDelete(DeleteQueryInfo deleteInfo);

}
