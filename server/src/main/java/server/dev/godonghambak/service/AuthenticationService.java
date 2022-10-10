package server.dev.godonghambak.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import server.dev.godonghambak.domain.entity.Authentication;
import server.dev.godonghambak.repository.AuthenticationRepository;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import static server.dev.godonghambak.domain.dto.AuthenticationDto.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JavaMailSender javaMailSender;
    private final AuthenticationRepository authenticationRepository;

    //인증 이메일 전송
    public boolean sendToEmail(SendEmail sendEmail) throws MessagingException {
        // 인증번호 생성
        String code = createCode();
        // 인증객체 생성
        Authentication Ingredient = Authentication
                                    .builder()
                                    .authentication_email(sendEmail.getAuthentication_email())
                                    .authentication_code(code)
                                    .build();

        Authentication findResult = authenticationRepository.findByEmail(sendEmail);
        if(findResult == null) {
            int insertResult = authenticationRepository.insert(Ingredient);
            if (insertResult > 0) {
                // 제한시간
                Date expiration = authenticationRepository.findByEmail(sendEmail).getAuthentication_expiration();
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm");
                String dataFormatExpiration = simpleDateFormat.format(expiration);

                this.sendMail(sendEmail.getAuthentication_email(), code, dataFormatExpiration);
                return true;
            }

        } else if (findResult != null) {
            int updateResult = authenticationRepository.update(Ingredient);
            if (updateResult > 0) {
                // 제한시간
                Date expiration = authenticationRepository.findByEmail(sendEmail).getAuthentication_expiration();
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm");
                String dataFormatExpiration = simpleDateFormat.format(expiration);

                this.sendMail(sendEmail.getAuthentication_email(), code, dataFormatExpiration);
                return true;
            }
        }
        //예외처리
        return false;
    }

    public static String createCode() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    public void sendMail(String email, String code, String time) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email); // 보내는 대상
        message.setSubject("고동함박 회원정보 인증번호 : " + code); // 제목

        StringBuffer sb = new StringBuffer();
        sb.append("<html>");
        sb.append("<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>");
        sb.append("<body>");
        sb.append("  <table align=\"center\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#efeff0\" style=\"border-collapse:collapse\">\r\n"
                + "    <tbody>\r\n"
                + "  <tr>\r\n"
                + "    <td width=\"100%\" height=\"100\"/>\r\n"
                + "  </tr>\r\n"
                + "      <tr>\r\n"
                + "        <td width=\"3%\"> </td>\r\n"
                + "        <td width=\"94%\"> </td>\r\n"
                + "        <td width=\"3%\"> </td>\r\n"
                + "      </tr>\r\n"
                + "      <tr>\r\n"
                + "          <td><table align=\"center\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#ffffff\" style=\"max-width:900px;margin:0 auto\">\r\n"
                + "          <tbody>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"100%\" height=\"25\" colspan=\"3\" bgcolor=\"#2d8546\"/>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"3%\" height=\"25\" bgcolor=\"#2d8546\"> </td>\r\n"
                + "              <td width=\"88%\" height=\"25\" bgcolor=\"#2d8546\">\r\n"
                + "                <img src=\"http://고동함박.com/img/logo2.png?1\" width=\"100\" height=\"30\" alt=\"Messengernara 계정\" border=\"0\" style=\"display:block\" loading=\"lazy\">\r\n"
                + "              </td>\r\n"
                + "              <td width=\"3%\" height=\"25\" bgcolor=\"#2d8546\"> </td>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"100%\" height=\"25\" colspan=\"3\" bgcolor=\"#2d8546\"/>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"100%\" height=\"35\" colspan=\"3\"/>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "              <td width=\"88%\" style=\"font-size:18px;line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;font-weight:bold;color:#1e1e1e\">\r\n"
                + "                회원정보 인증을 위한 인증번호입니다.\r\n"
                + "              </td>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"100%\" height=\"25\" colspan=\"3\"/>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "              <td width=\"88%\" style=\"font-size:14px;line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;color:#1e1e1e\">\r\n"
                + "                아래의 인증번호를 입력하여 인증을 진행하실 수 있습니다.\r\n"
                + "              </td>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"100%\" height=\"18\" colspan=\"3\"/>\r\n"
                + "            </tr>\r\n"
                + "            <tr>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "              <td width=\"88%\">\r\n"
                + "                <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;color:#1e1e1e\">\r\n"
                + "                  <tbody>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"100%\" height=\"1\" colspan=\"5\" bgcolor=\"#bebebe\"/>\r\n"
                + "                    </tr>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"100%\" height=\"25\" colspan=\"5\"/>\r\n"
                + "                    </tr>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"3%\"/>\r\n"
                + "                      <td width=\"3%\"/>\r\n"
                + "                    </tr>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"3%\"/>\r\n"
                + "                      <th align=\"left\" colspan=\"1\" rowspan=\"1\" valign=\"top\" width=\"35%\" style=\"font-size:14px;font-weight:normal\">\r\n"
                + "                        비밀번호 요청 이메일\r\n"
                + "                      </th>\r\n"
                + "                      <td width=\"2%\"/>\r\n"
                + "                      <td valign=\"top\" width=\"65%\" style=\"font-size:14px;font-weight:bold;word-break:break-all\">\r\n"
                +                         email + "\r\n"
                + "                      </td>\r\n"
                + "                      <td width=\"3%\"/>\r\n"
                + "                    </tr>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"100%\" height=\"8\" colspan=\"5\"/>\r\n"
                + "                    </tr>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"3%\"/>\r\n"
                + "                      <th align=\"left\" colspan=\"1\" rowspan=\"1\" valign=\"top\" width=\"35%\" style=\"font-size:14px;font-weight:normal\">\r\n"
                + "                        인증번호\r\n"
                + "                      </th>\r\n"
                + "                      <td width=\"2%\"/>\r\n"
                + "                      <td valign=\"top\" width=\"65%\" style=\"font-size:14px;font-weight:bold;word-break:break-all\">\r\n"
                +                         code + "\r\n"
                + "                      </td>\r\n"
                + "                      <td width=\"3%\"/>\r\n"
                + "                    </tr>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"100%\" height=\"8\" colspan=\"5\"/>\r\n"
                + "                    </tr>\r\n"
                + "                    <tr>\r\n"
                + "                      <td width=\"3%\"/>\r\n"
                + "                      <th align=\"left\" colspan=\"1\" rowspan=\"1\" valign=\"top\" width=\"35%\" style=\"font-size:14px;font-weight:normal\">\r\n"
                + "                        제한시간\r\n"
                + "                      </th>\r\n"
                + "                      <td width=\"2%\"/>\r\n"
                + "                    <td valign=\"top\" width=\"65%\" style=\"font-size:14px;font-weight:bold;word-break:break-all\">\r\n"
                +                         time + "\r\n"
                + "                    </td>\r\n"
                + "                    <td width=\"3%\"/>\r\n"
                + "                  </tr>\r\n"
                + "                  <tr>\r\n"
                + "                    <td width=\"100%\" height=\"27\" colspan=\"5\"/>\r\n"
                + "                  </tr>\r\n"
                + "                  <tr>\r\n"
                + "                    <td width=\"100%\" height=\"1\" colspan=\"5\" bgcolor=\"#bebebe\"/>\r\n"
                + "                  </tr>\r\n"
                + "                </tbody>\r\n"
                + "              </table>\r\n"
                + "            </td>\r\n"
                + "              <td width=\"3%\"> </td>\r\n"
                + "          </tr>\r\n"
                + "          <tr>\r\n"
                + "            <td width=\"100%\" height=\"30\" colspan=\"3\"/>\r\n"
                + "          </tr>\r\n"
                + "          <tr>\r\n"
                + "            <td width=\"6%\"> </td>\r\n"
                + "            <td width=\"88%\">\r\n"
                + "              <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" bgcolor=\"#f8f8f8\" style=\"line-height:22px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'굴림',gulim;letter-spacing:-1px;color:#1e1e1e\">\r\n"
                + "                <tbody>\r\n"
                + "                  <tr>\r\n"
                + "                    <td width=\"100%\" height=\"15\" colspan=\"3\"/>\r\n"
                + "                  </tr>\r\n"
                + "                  <tr>\r\n"
                + "                      <td width=\"3%\"> </td>\r\n"
                + "                    <td width=\"94%\" style=\"font-size:14px;font-weight:bold\">\r\n"
                + "                      요청하지 않은 인증번호 메일을 받으셨나요?\r\n"
                + "                    </td>\r\n"
                + "                      <td width=\"3%\"> </td>\r\n"
                + "                  </tr>\r\n"
                + "                  <tr>\r\n"
                + "                    <td width=\"100%\" height=\"7\" colspan=\"3\"/>\r\n"
                + "                  </tr>\r\n"
                + "   				 <tr>"
                + "					   <td width=\"3%\"/>"
                + "					   <td width=\"94%\" style=\"font-size:12px;line-height:18px\">"
                + " 				     내 계정이 맞다면, 누군가 오타로 메일을 잘못 발송했을 수 있습니다.<br>"
                + " 				     계정이 도용된 것은 아니니 안심하세요."
                + "					   </td>"
                + "					   <td width=\"3%\"/>"
                + "					  </tr>"
                + "					  <tr>"
                + "  				   <td width=\"100%\" height=\"18\" colspan=\"3\"/>"
                + "					  </tr>"
                + "                </tbody>\r\n"
                + "              </table>\r\n"
                + "            </td>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "          </tr>\r\n"
                + "          <tr>\r\n"
                + "            <td width=\"100%\" height=\"30\" colspan=\"3\"/>\r\n"
                + "          </tr>\r\n"
                + "          <tr>\r\n"
                + "            <td width=\"100%\" height=\"1\" colspan=\"3\" bgcolor=\"#e6e6e6\"/>\r\n"
                + "          </tr>\r\n"
                + "          <tr>\r\n"
                + "            <td width=\"100%\" height=\"16\" colspan=\"3\"/>\r\n"
                + "          </tr>\r\n"
                + "          <tr>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "            <td width=\"88%\" style=\"font-size:12px;line-height:18px;font-family:Apple SD Gothic Neo,sans-serif,'맑은고딕',Malgun Gothic,'돋움',Dotum;letter-spacing:-1px;color:#767676\">\r\n"
                + "              본 메일은 발신전용입니다.\r\n"
                + "              Copyright © ChatPeople Corp. All rights reserved.\r\n"
                + "            </td>\r\n"
                + "              <td width=\"6%\"> </td>\r\n"
                + "          </tr>\r\n"
                + "          <tr>\r\n"
                + "            <td width=\"100%\" height=\"18\" colspan=\"3\"/>\r\n"
                + "          </tr>\r\n"
                + "      </table>\r\n"
                + "    </td>\r\n"
                + "  </tr>\r\n"
                + "  <tr>\r\n"
                + "    <td width=\"100%\" height=\"100\"/>\r\n"
                + "  </tr>\r\n"
                + "</tbody>\r\n"
                + "  \r\n"
                + "  </table>\r\n");
        sb.append("</body>");
        sb.append("</html>");

        String msg = sb.toString();

        message.setText(msg, "utf-8", "html"); 		 // 내용
        message.setFrom(new InternetAddress(email)); // 보내는 사람

        javaMailSender.send(message);

    }
}
