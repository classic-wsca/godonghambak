package server.dev.godonghambak.repository;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import server.dev.godonghambak.domain.entity.Authentication;

import static server.dev.godonghambak.domain.dto.AuthenticationDto.*;

@Mapper
public interface AuthenticationRepository {

    @Select("SELECT * FROM authentication WHERE authentication_email = #{authentication_email}")
    public Authentication findByEmail(SendEmail sendEmail);

    @Insert("INSERT INTO authentication VALUES (#{authentication_email}, #{authentication_code}, now()+300)")
    public int insert(Authentication authentication);

    @Update("UPDATE authentication SET authentication_code = #{authentication_code}, " +
            "authentication_expiration = now()+300 WHERE authentication_email = #{authentication_email}")
    int update(Authentication ingredient);
}
