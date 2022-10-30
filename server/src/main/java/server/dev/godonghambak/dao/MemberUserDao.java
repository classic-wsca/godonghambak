package server.dev.godonghambak.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseStatus;
import server.dev.godonghambak.domain.entity.MemberUser;

import static server.dev.godonghambak.domain.dto.MemberUserDto.*;

@Mapper
@Repository
public interface MemberUserDao {

    @Insert("INSERT INTO member_user VALUES "
            + "(#{member_user_id}, #{member_user_email}, #{member_user_password}, #{member_user_name}, #{member_user_phone}, "
            + "#{member_user_birth}, now(), null)")
    public int insert(MemberUser memberUser);

    @Select("SELECT * FROM member_user WHERE member_user_email = #{member_user_email}")
    public MemberUser findByEmail(String member_user_email);

    @Select("SELECT member_user_email FROM member_user WHERE member_user_name = #{member_user_name} AND member_user_phone = #{member_user_phone}" +
            "AND member_user_birth = #{member_user_birth}")
    public FindEmailResult findEmail(FindEmail findEmail);

    @Update("UPDATE member_user SET member_user_password = #{member_user_password}" +
            "WHERE member_user_email = #{member_user_email}")
    public int updatePassword(ChangePassword changePassword);

}
