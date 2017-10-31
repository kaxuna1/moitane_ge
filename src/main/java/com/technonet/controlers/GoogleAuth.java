package com.technonet.controlers;

import com.google.api.client.http.*;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.JsonObjectParser;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.io.IOException;

/**
 * Created by vakhtanggelashvili on 3/21/17.
 */
public class GoogleAuth {
    static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    static final JsonFactory JSON_FACTORY = new JacksonFactory();


    static String refreshToken(String refreshToken) {
        HttpRequestFactory requestFactory =
                HTTP_TRANSPORT.createRequestFactory(request -> request.setParser(
                        new JsonObjectParser(JSON_FACTORY)));
        GenericUrl url = new GenericUrl("https://graph.facebook.com/me?access_token=");
        HttpRequest request = null;
        try {
            request = requestFactory.buildGetRequest(url);
            HttpResponse responseFB=request.execute();



        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }
}
