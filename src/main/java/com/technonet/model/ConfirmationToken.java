package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.technonet.Enums.ConfirmationTypes;
import org.simplejavamail.email.Email;
import org.simplejavamail.mailer.Mailer;
import org.simplejavamail.mailer.config.ProxyConfig;
import org.simplejavamail.mailer.config.ServerConfig;
import org.simplejavamail.mailer.config.TransportStrategy;

import javax.mail.Message;
import javax.persistence.*;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

import static com.technonet.staticData.Variables.mailer;

/**
 * Created by kaxa on 3/11/17.
 */
@Entity
@Table(name = "ConfirmationToken")
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "tokenId")
    private long id;

    @Column
    private String token;

    @Column
    private int type;

    @Column
    private Date date;

    @Column
    private Date confirmationDate;

    @Column
    private boolean confimed;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    @Column
    private String mailForConfirmation;

    public ConfirmationToken(int type, User user) {
        this.type = type;
        this.user = user;
        if (type == ConfirmationTypes.EMAIL.getCODE()) {
            this.token = UUID.randomUUID().toString();
        } else {
            this.token = ((new Random().nextInt(9000) + 1000) + "");
        }
        this.date = new Date();
        this.confimed = false;
    }

    public ConfirmationToken() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isConfimed() {
        return confimed;
    }

    public void setConfimed(boolean confimed) {
        this.confimed = confimed;
    }

    public void confirmToken() {
        if (!confimed) {
            this.confimed = true;
            this.confirmationDate = new Date();
            if (this.type == ConfirmationTypes.EMAIL.getCODE()) {
                this.user.setEmail(this.mailForConfirmation);
                this.user.setConfirmedEmail(true);
            }
        }

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMailForConfirmation() {
        return mailForConfirmation;
    }

    public void setMailForConfirmation(String mailForConfirmation) {
        this.mailForConfirmation = mailForConfirmation;
    }

    public void sendMail() {

        Email email = new Email();
        email.setFromAddress("ALLWITZ Confirmation", "confirm@allwitz.com");
        email.addRecipient("", mailForConfirmation, Message.RecipientType.TO);
        email.setSubject("Hello Confirm Your Email On ALLWITZ");
        email.setText("We should meet up! ;)");
        email.setTextHTML("please Confirm Account </br> " +
                "<a href='http://allwitz.com/confirmtoken?token=" + token + "'>click here to confirm</a>");


        mailer.sendMail(email, true);


    }

    public Date getConfirmationDate() {
        return confirmationDate;
    }

    public void setConfirmationDate(Date confirmationDate) {
        this.confirmationDate = confirmationDate;
    }
}
