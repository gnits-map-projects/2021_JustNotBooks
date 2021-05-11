package controllers;
import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import models.*;
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
import javax.*;
import static play.libs.Json.toJson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class TransactionController extends Controller {

    private final FormFactory formFactory;
    private final TransactionRepository transactionRepository;
    private final HttpExecutionContext ec;

    @Inject
    public TransactionController(FormFactory formFactory, TransactionRepository transactionRepository, HttpExecutionContext ec) {
        this.formFactory = formFactory;
        this.transactionRepository = transactionRepository;
        this.ec = ec;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public CompletionStage<Result> getTransac() {
        return transactionRepository.getNumberOfTransac().thenApplyAsync(transactionStream -> {
            return ok(toJson(transactionStream.collect(Collectors.toList())));
        }, ec.current());

    }
    public CompletionStage<Result> addTransaction(String trans) {
        //JsonNode js = request().body().asJson();
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        JsonNode js = objectMapper.readTree(trans.asJson());
       // JsonNode js=Json.toJson(trans);
        Transaction transaction=null;
        try {
            ObjectNode json = (ObjectNode) new ObjectMapper().readTree(trans);
            transaction = Json.fromJson(json, Transaction.class);

        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return transactionRepository.add(transaction).thenApplyAsync(p -> {
            //return redirect(routes.PersonController.index());
            String s = "{\"id\":" + p.id + "}";
            return ok(s);
        }, ec.current());

    }


}
