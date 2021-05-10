package controllers;
import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import models.Item;
import models.ItemRepository;
import play.data.FormFactory;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;

import java.io.*;
import java.sql.*;
import javax.inject.Inject;
import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.concurrent.CompletionStage;
import javax.persistence.NoResultException;
import java.util.stream.Collectors;
import javax.persistence.Query;

import static play.libs.Json.toJson;

public class ItemController extends Controller {

    private final FormFactory formFactory;
    private final ItemRepository itemRepository;
    private final HttpExecutionContext ec;

    @Inject
    public ItemController(FormFactory formFactory, ItemRepository itemRepository, HttpExecutionContext ec) {
        this.formFactory = formFactory;
        this.itemRepository = itemRepository;
        this.ec = ec;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public CompletionStage<Result> getBuyItems() {
        JsonNode js = request().body().asJson();
        String owner = js.get("owner").asText();
        return itemRepository.listBuy(owner).thenApplyAsync(itemStream -> {
            return ok(toJson(itemStream.collect(Collectors.toList())));
        }, ec.current());
    }
    public CompletionStage<Result> getItemNames() {

        return itemRepository.listItemNames().thenApplyAsync(itemStream -> {
            return ok(toJson(itemStream.collect(Collectors.toList())));
        }, ec.current());
    }
    public CompletionStage<Result> getBorrowItems() {
        JsonNode js = request().body().asJson();
        String owner = js.get("owner").asText();
        return itemRepository.listBorrow(owner).thenApplyAsync(itemStream -> {
            return ok(toJson(itemStream.collect(Collectors.toList())));
        }, ec.current());
    }
    public CompletionStage<Result> getDonateItems() {
        JsonNode js = request().body().asJson();
        String owner = js.get("owner").asText();
        return itemRepository.listDonate(owner).thenApplyAsync(itemStream -> {
            return ok(toJson(itemStream.collect(Collectors.toList())));
        }, ec.current());
    }
    public CompletionStage<Result> getItemsUpload() {
        JsonNode js = request().body().asJson();
        String owner = js.get("owner").asText();
        return itemRepository.listUploaded(owner).thenApplyAsync(itemStream -> {
            return ok(toJson(itemStream.collect(Collectors.toList())));
        }, ec.current());
    }
    public CompletionStage<Result> getItemsTaken() {
        JsonNode js = request().body().asJson();
        String customer = js.get("customer").asText();
        return itemRepository.listTaken(customer).thenApplyAsync(itemStream -> {
            return ok(toJson(itemStream.collect(Collectors.toList())));
        }, ec.current());
    }

    public CompletionStage<Result> addItem() {
        JsonNode js = request().body().asJson();
        Item item = Json.fromJson(js, Item.class);
        return itemRepository.add(item).thenApplyAsync(p -> {
            //return redirect(routes.PersonController.index());
            String s="{\"id\":"+p.id+"}";
            return ok(s);
        }, ec.current());
    }

    public CompletionStage<Result> buy(){
        JsonNode js = request().body().asJson();
        String customer = js.get("customer").asText();
        Long id = js.get("id").asLong();
        String takenAt=js.get("takenAt").asText();
        return itemRepository.buyItem(customer,id,takenAt).thenApplyAsync(ps ->{
            if (ps != null) {
                /*return badRequest("not a valid");*/
                return ok(" "+ps.owner);
            }
            else {

                return badRequest("cannot Buy");

            }
        });

    }

    public CompletionStage<Result> delItem() {
        JsonNode js = request().body().asJson();
        String owner = js.get("owner").asText();
        Long id = js.get("id").asLong();
        return itemRepository.del(owner,id).thenApplyAsync(p -> {
            if (p != null) {
                /*return badRequest("not a valid");*/
                return ok("Delete Successful");
            }
            else {

                return badRequest("cannot Delete");

            }
        }, ec.current());
    }


    public CompletionStage<Result> editItem() {
        JsonNode j = request().body().asJson();
        Long id=j.get("id").asLong();
        Integer price=j.get("price").asInt();
        String description = j.get("description").asText();
        String address = j.get("address").asText();
        String category = j.get("category").asText();
        String fromDate=j.get("fromDate").asText();
        String toDate=j.get("toDate").asText();
        return itemRepository.edit(id,price,description,address,category,fromDate,toDate).thenApplyAsync(p -> {
            if(p!=null)
                return ok("Update successful"+p.id);
            else
                return badRequest("Cannot update");
        }, ec.current());
    }

    public Result itemDetails() {

        JsonNode j = request().body().asJson();
        Long id = j.get("id").asLong();

        /*return personRepository.listuser(username,password).thenApplyAsync(personStream -> {
            return ok(toJson(personStream.collect(Collectors.toList())));*/
        Item ps = itemRepository.details(id);

        if (ps == null) {
            return badRequest("Invalid credentials!!");
        } else {
            //String s = "{\"itemName\":\"" + ps.itemName + "\", \"price\":\"" + ps.price + "\",\"category\":\"" + ps.category + "\",\"address\":\"" + ps.address + "\",\"description\":\"" + ps.description + "\",\"fromDate\":\"" + ps.fromDate + "\",\"toDate\":\"" + ps.toDate + "\"}";

            return ok(Json.toJson(ps));
        }

    }

    public CompletionStage<Result> search(){
        JsonNode j = request().body().asJson();
        String search = j.get("search").asText();
        String owner = j.get("owner").asText();
        //Stream<Item> ps=itemRepository.getSearchItems(search);
        return itemRepository.getSearchItems(search,owner).thenApplyAsync(ps ->{
            if (ps == null) {
                return badRequest("No results Found");
            } else {
                // String s="{\"email\":\""+ps.email+"\", \"name\":\""+ps.name+"\",\"phoneNumber\":\""+ps.phoneNumber+"\"}";

                return ok(Json.toJson(ps));
            }
        });

    }

    public CompletionStage<Result> borrow(){
        JsonNode js = request().body().asJson();
        String customer = js.get("customer").asText();
        Long id = js.get("id").asLong();
        String takenAt=js.get("takenAt").asText();
        return itemRepository.borrowItem(customer,id,takenAt).thenApplyAsync(ps ->{
            if (ps != null) {
                /*return badRequest("not a valid");*/
                return ok(" "+ps.owner);
            }
            else {

                return badRequest("cannot Borrow");

            }
        });

    }
    public CompletionStage<Result> returnItem(){
        JsonNode js = request().body().asJson();
        String customer = js.get("customer").asText();
        Long id = js.get("id").asLong();
        String returnedAt=js.get("returnedAt").asText();
        return itemRepository.returnItem(customer,id,returnedAt).thenApplyAsync(ps ->{
            if (ps != null) {
                /*return badRequest("not a valid");*/
                return ok(" "+ps.owner);
            }
            else {

                return badRequest("cannot Return");

            }
        });

    }


}
