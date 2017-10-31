package com.technonet.controlers;



import com.google.api.client.auth.oauth2.BearerToken;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.http.*;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.http.json.JsonHttpContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.util.GenericData;
import com.google.api.client.util.Key;
import com.google.api.services.calendar.CalendarScopes;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.technonet.Enums.JsonReturnCodes;
import com.technonet.Repository.SessionRepository;
import com.technonet.Repository.UserRepository;
import com.technonet.model.JsonMessage;
import com.technonet.model.Session;
import com.technonet.model.User;
import org.apache.http.*;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.GenericJson;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonObjectParser;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.GeneralSecurityException;
import java.util.*;

/**
 * Created by KGelashvili on 10/26/2015.
 */
@Controller
public class SessionController {

    static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    static final JsonFactory JSON_FACTORY = new JacksonFactory();


    @RequestMapping("/loginapi")
    public String login(String username, String password,HttpServletResponse response,HttpServletRequest request){
        Session session;
        User user;
        List<User> users=userDao.findByEmailAndPassword(username,password);

        String referer = request.getHeader("Referer");
        if(users.size()==0){
            return "redirect:"+referer;
        }else{
            user=users.get(0);
            session=new Session(new Date(),user);
            session=sessionDao.save(session);
            response.addCookie(new Cookie("projectSessionId", session.getId()+""));
            response.addCookie(new Cookie("userId", session.getUser().getId()+""));
            response.addCookie(new Cookie("lang", session.getUser().getLanguage()+""));

            return "redirect:"+referer;
        }
    }
    @RequestMapping("/loginmobileapi")
    @ResponseBody
    public Session loginMobile(String email, String password,HttpServletResponse response){
        Session session;
        User user;
        List<User> users=userDao.findByEmailAndPassword(email,password);

        if(users.size()==0){
            return null;
        }else{
            user=users.get(0);
            session=new Session(new Date(),user);
            session=sessionDao.save(session);
            return session;
        }
    }
    @RequestMapping("/loginapifb/{token}")
    @ResponseBody
    public Session loginFB(@PathVariable("token")String token, HttpServletResponse response){
        Session session;
        User user;
        HttpRequestFactory requestFactory =
                HTTP_TRANSPORT.createRequestFactory(request -> request.setParser(new JsonObjectParser(JSON_FACTORY)));
        GenericUrl url=new GenericUrl("https://graph.facebook.com/me?access_token="+token);
        try {
            HttpRequest request = requestFactory.buildGetRequest(url);
            HttpResponse responseFB=request.execute();

            FBSession fbSession=responseFB.parseAs(FBSession.class);
            List<User> users=userDao.findByFacebookIdAndActive(fbSession.id,true);

            if(users.size()==0){
                return new Session();
            }else{
                user=users.get(0);
                session=new Session(new Date(),user);
                session=sessionDao.save(session);
                response.addCookie(new Cookie("userId", session.getUser().getId()+""));
                response.addCookie(new Cookie("projectSessionId", session.getId()+""));
                response.addCookie(new Cookie("lang", session.getUser().getLanguage()+""));
                return session;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }








    }
    public static class FBSession {

        /** List of Google+ activities. */
        @Key("id")
        private String id;

        public String getId() {
            return id;
        }
    }
    @RequestMapping("/loginapigoogle")
    @ResponseBody
    public Session loginGoogle(String token, HttpServletResponse response){
        Session session;
        User user;
        HttpRequestFactory requestFactory =
                HTTP_TRANSPORT.createRequestFactory(request -> request.setParser(new JsonObjectParser(JSON_FACTORY)));
        GenericUrl url=new GenericUrl("https://www.googleapis.com/oauth2/v1/tokeninfo?id_token="+token);
        try {
            HttpRequest request = requestFactory.buildGetRequest(url);
            HttpResponse responseFB=request.execute();
            GoogleSession googleSession=responseFB.parseAs(GoogleSession.class);
            List<User> users=userDao.findByGoogleIdAndActive(googleSession.id,true);

            if(users.size()==0){
                return null;
            }else{
                user=users.get(0);
                session=new Session(new Date(),user);
                session=sessionDao.save(session);
                response.addCookie(new Cookie("userId", session.getUser().getId()+""));
                response.addCookie(new Cookie("projectSessionId", session.getId()+""));
                response.addCookie(new Cookie("lang", session.getUser().getLanguage()+""));
                return session;
            }

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }








    }

    public static class GoogleSession {
        @Key("user_id")
        private String id;

        public String getId() {
            return id;
        }
    }

    @RequestMapping("/oauthcall")
    public String savecalltoken(@CookieValue("projectSessionId") long sessionId,
                                 @RequestParam("code")String token){
        Session session= sessionDao.findOne(sessionId);
        User user=session.getUser();
        GoogleAuthorizationCodeTokenRequest g=new GoogleAuthorizationCodeTokenRequest(HTTP_TRANSPORT,
                JSON_FACTORY,
                "55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com",
                "qUPLRbRgZjm-wMJ_VBDWrEPC",
                token,
                "http://allwitz.com/oauthcall");


        g.setScopes(Collections.singleton("https://www.googleapis.com/auth/calendar"));
        try {
            GoogleTokenResponse response=g.execute();
            String token2=response.getAccessToken();
            user.setCalendarRefreshToken(response.getRefreshToken());
            userDao.save(user);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "redirect:/";
    }
    private String getAccessToken(String token)
    {
        try
        {
            Map<String,Object> params = new LinkedHashMap<>();
            params.put("grant_type","authorization_code");
            params.put("client_id","55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com");
            params.put("client_secret","qUPLRbRgZjm-wMJ_VBDWrEPC");
            params.put("code",token);

            StringBuilder postData = new StringBuilder();
            for(Map.Entry<String,Object> param : params.entrySet())
            {
                if(postData.length() != 0)
                {
                    postData.append('&');
                }
                postData.append(URLEncoder.encode(param.getKey(),"UTF-8"));
                postData.append('=');
                postData.append(URLEncoder.encode(String.valueOf(param.getValue()),"UTF-8"));
            }
            byte[] postDataBytes = postData.toString().getBytes("UTF-8");

            URL url = new URL("https://www.googleapis.com/oauth2/v4/token");
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setDoOutput(true);
            con.setUseCaches(false);
            con.setRequestMethod("POST");
            con.getOutputStream().write(postDataBytes);

            BufferedReader reader = new BufferedReader(new InputStreamReader(con.getInputStream()));
            StringBuffer buffer = new StringBuffer();
            for (String line = reader.readLine(); line != null; line = reader.readLine())
            {
                buffer.append(line);
            }

            JsonParser parser = new JsonParser();
            JsonObject o = parser.parse(buffer.toString()).getAsJsonObject();

            String accessToken = o.get("access_token").getAsString();
            return accessToken;
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
        return null;
    }

    public static HttpResponse executeGet(
            HttpTransport transport, JsonFactory jsonFactory, String accessToken, GenericUrl url)
            throws IOException {
        Credential credential =
                new Credential(BearerToken.authorizationHeaderAccessMethod()).setAccessToken(accessToken);
        HttpRequestFactory requestFactory = transport.createRequestFactory(credential);
        return requestFactory.buildGetRequest(url).execute();
    }


    @RequestMapping("/logout")
    @ResponseBody
    public Session logout(@CookieValue("projectSessionId") String sessionId){
        Session session=sessionDao.findOne(Long.parseLong(sessionId));
        session.setIsactive(false);
        sessionDao.save(session);
        return session;
    }
    @RequestMapping("/getsessionstatus")
    @ResponseBody
    public Session sessionStatus(@CookieValue("projectSessionId") String sessionId){
        Session session=sessionDao.findOne(Long.parseLong(sessionId));
        return session;
    }
    @Autowired
    private UserRepository userDao;
    @Autowired
    private SessionRepository sessionDao;
}
