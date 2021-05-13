package models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Item")
public class Item {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    public Long id;

    public String owner;
    //public String name;
    public String itemName;
    public Integer price;
    public String customer;
    public String image;
    public String description;
    public String category;
    public String fromDate;
    public String toDate;
    public String address;
    public String status="Available";
    public String uploadedAt;
    public String rating;

    public void setUploadedAt(String uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getToDate() {
        return toDate;
    }
    //Date from=new Date();

    /*public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }*/

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }






    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }


    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

   /*public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }*/

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

   public  String getRating(){return rating;}
   public  void  setRating(String rating) { this.rating=rating ;}

}