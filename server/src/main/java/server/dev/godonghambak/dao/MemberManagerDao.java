package server.dev.godonghambak.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import server.dev.godonghambak.domain.entity.MemberManage;
import server.dev.godonghambak.domain.entity.MemberUser;

@Mapper
public interface MemberManagerDao {

    @Insert("INSERT INTO member_manage VALUES "
            + "(#{member_manage_id}, #{member_manage_email}, #{member_manage_password}, #{member_manage_name}, "
            + "#{manage_info_id}, #{menu_id})")
    public int insert(MemberManage memberManage);

    @Select("SELECT * FROM member_manage WHERE member_manage_email = #{member_manage_email}")
    public MemberManage findByEmail(String member_manage_email);
}
