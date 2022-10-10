package server.dev.godonghambak.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import server.dev.godonghambak.domain.entity.Authentication;
import server.dev.godonghambak.domain.entity.MemberUser;

import static server.dev.godonghambak.domain.dto.MemberUserDto.*;

@Mapper
public interface MemberUserRepository {

    @Insert("INSERT INTO member_user VALUES "
            + "(#{member_user_id}, #{member_user_email}, #{member_user_password}, #{member_user_name}, #{member_user_phone}, "
            + "#{member_user_birth}, null, now(), null)")
    public int insert(MemberUser memberUser);

    @Select("SELECT * FROM member_user WHERE member_user_email = #{member_user_email} AND member_user_password = #{member_user_password}")
    public MemberUser findByEmailAndPassword(SignIn signInInfo);

    @Select("SELECT member_user_email FROM member_user WHERE member_user_name = #{member_user_name} AND member_user_phone = #{member_user_phone}" +
            "AND member_user_birth = #{member_user_birth}")
    public FindEmailResult findEmail(FindEmail findEmail);

    @Update("UPDATE member_user SET member_user_password = #{member_user_password}" +
            "WHERE member_user_email = #{member_user_email}")
    public int updatePassword(ChangePassword changePassword);

}
