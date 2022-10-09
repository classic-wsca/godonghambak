package server.dev.godonghambak.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import server.dev.godonghambak.domain.entity.MemberUser;

@Mapper
public interface MemberUserRepository {

    @Insert("INSERT INTO member_user VALUES "
            + "(#{member_user_id}, #{member_user_email}, #{member_user_password}, #{member_user_name}, #{member_user_phone}, "
            + "#{member_user_birth}, null, now(), null)")
    public int insert(MemberUser memberUser);
}
