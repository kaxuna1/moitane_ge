package com.technonet.staticData;

import com.github.kevinsawicki.http.HttpRequest;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.technonet.model.User;
import com.technonet.model.WeekDay;
import org.simplejavamail.mailer.Mailer;
import org.simplejavamail.mailer.config.ServerConfig;
import org.simplejavamail.mailer.config.TransportStrategy;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by kaxa on 3/8/17.
 */
public class Variables {
    //public static String appDir = "/Users/kaxa/IdeaProjects/moitane_ge/build/app";
    public static String appDir="E:/app";

    public static Mailer mailer=new Mailer(
            new ServerConfig("smtp.gmail.com", 587, "kaxgel11@gmail.com", "Gelashvili@123"),
            TransportStrategy.SMTP_TLS
    );
    static {

    }

    public static BufferedImage getScaledInstance(BufferedImage img, int targetWidth, int targetHeight, Object hint,
                                                  boolean higherQuality) {
        int type = (img.getTransparency() == Transparency.OPAQUE) ? BufferedImage.TYPE_INT_RGB
                : BufferedImage.TYPE_INT_ARGB;
        BufferedImage ret = (BufferedImage) img;
        if (ret.getHeight() < targetHeight || ret.getWidth() < targetWidth) {
            higherQuality = false;
        }
        int w, h;
        if (higherQuality) {
            // Use multi-step technique: start with original size, then
            // scale down in multiple passes with drawImage()
            // until the target size is reached
            w = img.getWidth();
            h = img.getHeight();
        } else {
            // Use one-step technique: scale directly from original
            // size to target size with a single drawImage() call
            w = targetWidth;
            h = targetHeight;
        }

        do {
            if (higherQuality && w > targetWidth) {
                w /= 2;
                if (w < targetWidth) {
                    w = targetWidth;
                }
            }

            if (higherQuality && h > targetHeight) {
                h /= 2;
                if (h < targetHeight) {
                    h = targetHeight;
                }
            }

            BufferedImage tmp = new BufferedImage(w, h, type);
            Graphics2D g2 = tmp.createGraphics();
            g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, hint);
            g2.drawImage(ret, 0, 0, w, h, null);
            g2.dispose();

            ret = tmp;
        } while (w != targetWidth || h != targetHeight);

        return ret;
    }

    public static BufferedImage resize(BufferedImage img, int newW, int newH) {
        Image tmp = img.getScaledInstance(newW, newH, Image.SCALE_SMOOTH);
        BufferedImage dimg = new BufferedImage(newW, newH, BufferedImage.TYPE_INT_ARGB);

        Graphics2D g2d = dimg.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();

        return dimg;
    }

    public static HashMap<Integer, WeekDay> getWeekDays() {
        HashMap<Integer, WeekDay> hashMap = new HashMap<>();
        hashMap.put(0, new WeekDay(0, "Monday"));
        hashMap.put(1, new WeekDay(1, "Tuesday"));
        hashMap.put(2, new WeekDay(2, "Wednesday"));
        hashMap.put(3, new WeekDay(3, "Thursday"));
        hashMap.put(4, new WeekDay(4, "Friday"));
        hashMap.put(5, new WeekDay(5, "Saturday"));
        hashMap.put(6, new WeekDay(6, "Sunday"));

        return hashMap;
    }

    public static com.google.api.services.calendar.Calendar getCalendarClient(User user) {
        HttpTransport httpTransport;

        JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

        com.google.api.services.calendar.Calendar client;

        try {
            httpTransport = GoogleNetHttpTransport.newTrustedTransport();

            // initialize the data store factory

            GoogleRefreshTokenRequest g = new GoogleRefreshTokenRequest(httpTransport,
                    JSON_FACTORY,
                    user.getCalendarRefreshToken(),
                    "55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com",
                    "qUPLRbRgZjm-wMJ_VBDWrEPC");
            TokenResponse tokenResponse = g.execute();
            // initialize the transport


            GoogleCredential credential = new GoogleCredential().setAccessToken(tokenResponse.getAccessToken());
            String ref = credential.getRefreshToken();

            // set up global Calendar instance
            client = new com.google.api.services.calendar.Calendar.Builder(
                    httpTransport, JSON_FACTORY, credential).setApplicationName("ALLWITZ").build();
            return client;

        } catch (Exception e) {
            return null;
        }
    }

    public static Map<Integer,Map<String,String>> stringsMap=new HashMap<>();

    public static final ThreadLocal<Integer> myThreadLocal = new ThreadLocal<Integer>();

    public static boolean paymentDone(String trans_id){
        String sURL = "http://allwitz.com:88/check.php?id="+trans_id;
        String response = HttpRequest.get(sURL).body();

        if(response.contains("RESULT_CODE: 000")){
            return true;
        }else{
            return false;
        }
    }
    public static boolean paymentFinish(String trans_id,int sum){
        String sURL = "http://allwitz.com:88/finish.php?id="+trans_id+"&sum="+sum;
        String response = HttpRequest.get(sURL).body();
        return true;
    }


}
