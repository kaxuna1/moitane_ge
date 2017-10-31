package com.technonet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by vakhtanggelashvili on 5/17/17.
 */

@Entity
@Table(name = "Rating")
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ratingId")
    private long id;



    @ManyToOne
    @JoinColumn(name = "userCategoryJoinId")
    @JsonIgnore
    private UserCategoryJoin userCategoryJoin;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    @Column
    private String comment;


    @Column
    private float score;



    @Column
    private float scorepunctual;

    @Column
    private float scorebalanced;

    @Column
    private float scoreresolved;

    public Rating(UserCategoryJoin userCategoryJoin, User user, String comment, float score) {
        this.userCategoryJoin = userCategoryJoin;
        this.user = user;
        this.comment = comment;
        this.score = score;
    }
    public Rating(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserCategoryJoin getUserCategoryJoin() {
        return userCategoryJoin;
    }

    public void setUserCategoryJoin(UserCategoryJoin userCategoryJoin) {
        this.userCategoryJoin = userCategoryJoin;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }


    public void setScorepunctual(float scorepunctual) {
        this.scorepunctual = scorepunctual;
    }

    public float getScorebalanced() {
        return scorebalanced;
    }

    public void setScorebalanced(float scorebalanced) {
        this.scorebalanced = scorebalanced;
    }

    public float getScoreresolved() {
        return scoreresolved;
    }

    public void setScoreresolved(float scoreresolved) {
        this.scoreresolved = scoreresolved;
    }

    public float getScorepunctual() {
        return scorepunctual;
    }

    public float getScoreSum(){
        return (score+scorebalanced+scorepunctual+scoreresolved)/4;
    }

}
