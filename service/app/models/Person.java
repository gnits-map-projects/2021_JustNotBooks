package models;

import javax.persistence.*;


@Entity
public class Person {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long id;

    public String name;
    public String email;
    public Long phoneNumber;
    public String address;
    public String pswd;
    public String review;
    public  Long rating;

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public String getPswd() {
        return pswd;
    }

    public void setPswd(String pswd) {
        this.pswd = pswd;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public  String getReview(){ return review;}
    public  void setReview(String review){this.review=review;}
    public  Long getRating(){ return rating;}
    public  void setRating(Long rating){this.rating=rating;}
}
