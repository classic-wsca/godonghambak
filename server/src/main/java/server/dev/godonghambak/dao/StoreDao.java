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
    public List<InsertOrUpdateDto> findAll();

    @Insert("INSERT INTO store VALUES "
            + "(#{store_id}, #{store_name}, #{store_image}, #{store_contact}, #{store_address}, #{store_businesshours},"
            + "#{store_breaktime}, #{store_lastorder}, #{store_parking}, #{store_wifi}, #{store_kiosk})")
    public int insert(Store insertinfo);

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
    public int update(Store updateInfo);

    @Delete("DELETE FROM store "
            + "WHERE store_id = #{store_id} AND store_name = #{store_name}")
    public int delete(DeleteDto deleteInfo);

}
