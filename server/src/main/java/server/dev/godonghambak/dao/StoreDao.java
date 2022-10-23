package server.dev.godonghambak.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import server.dev.godonghambak.domain.entity.MemberUser;
import server.dev.godonghambak.domain.entity.Store;

@Mapper
public interface StoreDao {


    @Insert("INSERT INTO store VALUES "
            + "(#{store_id}, #{store_name}, #{store_image}, #{store_contact}, #{store_address}, #{store_businesshours},"
            + "#{store_breaktime}, #{store_lastorder}, #{store_parking}, #{store_wifi}, #{store_kiosk})")
    public int insert(Store store);

    @Select("SELECT * FROM store WHERE store_name = #{store_name}")
    public Store findByName(String store_name);
}
