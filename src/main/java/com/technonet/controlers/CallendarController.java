package com.technonet.controlers;

import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.googleapis.batch.BatchRequest;
import com.google.api.client.googleapis.batch.json.JsonBatchCallback;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonError;
import com.google.api.client.http.HttpHeaders;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.Lists;
import com.google.api.client.util.store.DataStoreFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.model.*;
import com.technonet.Repository.SessionRepository;
import com.technonet.Repository.UserRepository;
import com.technonet.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * Created by vakhtanggelashvili on 3/21/17.
 */
@Controller
public class CallendarController {



    @RequestMapping("/getmycalendarslist")
    @ResponseBody
    public List<CalendarListEntry> getMyCals(@CookieValue("projectSessionId") long sessionId){
        Session session = sessionRepository.findOne(sessionId);
        if(session.getUser().getCalendarRefreshToken()!=null){
            try {
                httpTransport = GoogleNetHttpTransport.newTrustedTransport();

                // initialize the data store factory
                dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);

                GoogleRefreshTokenRequest g=new GoogleRefreshTokenRequest(httpTransport,
                        JSON_FACTORY,
                        session.getUser().getCalendarRefreshToken(),
                        "55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com",
                        "qUPLRbRgZjm-wMJ_VBDWrEPC");
                TokenResponse tokenResponse=g.execute();
                // initialize the transport


                GoogleCredential credential = new GoogleCredential().setAccessToken(tokenResponse.getAccessToken());
                String ref = credential.getRefreshToken();

                // set up global Calendar instance
                client = new com.google.api.services.calendar.Calendar.Builder(
                        httpTransport, JSON_FACTORY, credential).setApplicationName(APPLICATION_NAME).build();
                CalendarList feed = client.calendarList().list().execute();
                return feed.getItems().stream().filter(new Predicate<CalendarListEntry>() {
                    @Override
                    public boolean test(CalendarListEntry calendarListEntry) {
                        return calendarListEntry.getAccessRole().equals("owner");
                    }
                }).collect(Collectors.toList());

            } catch (IOException | GeneralSecurityException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


    @RequestMapping("/setcalendarid")
    @ResponseBody
    public boolean setCallId(@CookieValue("projectSessionId") long sessionId,
                             String id){
        try{
            Session session=sessionRepository.findOne(sessionId);
            session.getUser().setCalendarId(id);
            userRepository.save(session.getUser());
            return true;
        }catch (Exception e){
            return false;
        }

    }


    private static final String APPLICATION_NAME = "App";

    /**
     * Directory to store user credentials.
     */
    private static final java.io.File DATA_STORE_DIR =
            new java.io.File(System.getProperty("user.home"), ".store/calendar_sample");

    /**
     * Global instance of the {@link DataStoreFactory}. The best practice is to make it a single
     * globally shared instance across your application.
     */
    private static FileDataStoreFactory dataStoreFactory;

    /**
     * Global instance of the HTTP transport.
     */
    private static HttpTransport httpTransport;

    /**
     * Global instance of the JSON factory.
     */
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    private static com.google.api.services.calendar.Calendar client;

    static final java.util.List<Calendar> addedCalendarsUsingBatch = Lists.newArrayList();


    @RequestMapping("/calendar")
    @ResponseBody
    public String call(@CookieValue("projectSessionId") long sessionId) {

        Session session = sessionRepository.findOne(sessionId);

        // Exchange auth code for access token

        try {
            httpTransport = GoogleNetHttpTransport.newTrustedTransport();

            // initialize the data store factory
            dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);

            GoogleRefreshTokenRequest g=new GoogleRefreshTokenRequest(httpTransport,
                    JSON_FACTORY,
                    session.getUser().getCalendarRefreshToken(),
                    "55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com",
                    "qUPLRbRgZjm-wMJ_VBDWrEPC");
            TokenResponse tokenResponse=g.execute();
            // initialize the transport


            GoogleCredential credential = new GoogleCredential().setAccessToken(tokenResponse.getAccessToken());
            String ref = credential.getRefreshToken();

            // set up global Calendar instance
            client = new com.google.api.services.calendar.Calendar.Builder(
                    httpTransport, JSON_FACTORY, credential).setApplicationName(APPLICATION_NAME).build();

            // run commands
            showCalendars();
            addCalendarsUsingBatch();
            Calendar calendar = addCalendar();
            updateCalendar(calendar);
            addEvent(calendar);
            showEvents(calendar);
            deleteCalendarsUsingBatch();
            deleteCalendar(calendar);
        } catch (IOException | GeneralSecurityException e) {
            e.printStackTrace();
        }
        return "";
    }

    private static void showCalendars() throws IOException {
        View.header("Show Calendars");
        CalendarList feed = client.calendarList().list().execute();
        View.display(feed);
    }

    private static void addCalendarsUsingBatch() throws IOException {
        View.header("Add Calendars using Batch");
        BatchRequest batch = client.batch();

        // Create the callback.
        JsonBatchCallback<Calendar> callback = new JsonBatchCallback<Calendar>() {

            @Override
            public void onSuccess(Calendar calendar, HttpHeaders responseHeaders) {
                View.display(calendar);
                addedCalendarsUsingBatch.add(calendar);
            }

            @Override
            public void onFailure(GoogleJsonError e, HttpHeaders responseHeaders) {
                System.out.println("Error Message: " + e.getMessage());
            }
        };

        // Create 2 Calendar Entries to insert.
        Calendar entry1 = new Calendar().setSummary("Calendar for Testing 1");
        client.calendars().insert(entry1).queue(batch, callback);

        Calendar entry2 = new Calendar().setSummary("Calendar for Testing 2");
        client.calendars().insert(entry2).queue(batch, callback);

        batch.execute();
    }

    private static Calendar addCalendar() throws IOException {
        View.header("Add Calendar");
        Calendar entry = new Calendar();
        entry.setSummary("Calendar for Testing 3");
        Calendar result = client.calendars().insert(entry).execute();
        View.display(result);
        return result;
    }

    private static Calendar updateCalendar(Calendar calendar) throws IOException {
        View.header("Update Calendar");
        Calendar entry = new Calendar();
        entry.setSummary("Updated Calendar for Testing");
        Calendar result = client.calendars().patch(calendar.getId(), entry).execute();
        View.display(result);
        return result;
    }


    private static void addEvent(Calendar calendar) throws IOException {
        View.header("Add Event");
        Event event = newEvent();
        Event result = client.events().insert(calendar.getId(), event).execute();
        View.display(result);
    }

    private static Event newEvent() {
        Event event = new Event();
        event.setSummary("New Event");
        Date startDate = new Date();
        Date endDate = new Date(startDate.getTime() + 3600000);
        DateTime start = new DateTime(startDate, TimeZone.getTimeZone("UTC"));
        event.setStart(new EventDateTime().setDateTime(start));
        DateTime end = new DateTime(endDate, TimeZone.getTimeZone("UTC"));
        event.setEnd(new EventDateTime().setDateTime(end));
        return event;
    }

    private static void showEvents(Calendar calendar) throws IOException {
        View.header("Show Events");
        Events feed = client.events().list(calendar.getId()).execute();
        View.display(feed);
    }

    private static void deleteCalendarsUsingBatch() throws IOException {
        View.header("Delete Calendars Using Batch");
        BatchRequest batch = client.batch();
        for (Calendar calendar : addedCalendarsUsingBatch) {
            client.calendars().delete(calendar.getId()).queue(batch, new JsonBatchCallback<Void>() {

                @Override
                public void onSuccess(Void content, HttpHeaders responseHeaders) {
                    System.out.println("Delete is successful!");
                }

                @Override
                public void onFailure(GoogleJsonError e, HttpHeaders responseHeaders) {
                    System.out.println("Error Message: " + e.getMessage());
                }
            });
        }

        batch.execute();
    }

    private static void deleteCalendar(Calendar calendar) throws IOException {
        View.header("Delete Calendar");
        client.calendars().delete(calendar.getId()).execute();
    }


    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private UserRepository userRepository;
}
