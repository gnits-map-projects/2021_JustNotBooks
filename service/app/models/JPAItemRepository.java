package models;

import play.db.jpa.JPAApi;
import play.libs.Json;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.lang.Exception;

import javax.persistence.NoResultException;
import models.*;
import controllers.TransactionController;


import static java.util.concurrent.CompletableFuture.supplyAsync;
import java.time.LocalDate;

/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public class JPAItemRepository implements ItemRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;
    private final TransactionController transactionController;
    //public enum status{Available,Unavailable};

    @Inject
    public JPAItemRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext,TransactionController transactionController) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
        this.transactionController=transactionController;
    }

    @Override
    public CompletionStage<Item> add(Item item) {
        return supplyAsync(() -> wrap(em -> insert(em, item)), executionContext);
    }


    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }

    private Item insert(EntityManager em, Item item) {
        em.persist(item);
        return item;
    }


    @Override
    public CompletionStage<Stream<Item>> listBuy(String owner) {
        return supplyAsync(() -> wrap(em -> listbuy(em,owner)), executionContext);
    }
    private Stream<Item> listbuy(EntityManager em,String owner) {
        String s="Available";
        String cat="Buy";
        List<Item> items = em.createQuery("select i from Item i where status=:s and not owner=:owner and category=:cat", Item.class).setParameter("s",s).setParameter("owner",owner).setParameter("cat",cat).getResultList();
        return items.stream();
    }

    @Override
    public CompletionStage<Integer> addReview(String itemname,Long rate1,Long rate2,String review) {
        return supplyAsync(() -> wrap(em -> insertReview(em,itemname,rate1,rate2,review)), executionContext);
    }
    private int insertReview(EntityManager em,String itemname,Long rate1,Long rate2,String review)

    {

        int i = em.createQuery("update Item SET review =: r ,rate1=: ra ,rate2=: ra2 where itemName=:itemname").setParameter("itemname",itemname).setParameter("ra", rate1).setParameter("ra2",rate2).setParameter("r", review).executeUpdate();
        return i;
    }

    @Override
    public CompletionStage<Stream<String>> listItemNames() {
        return supplyAsync(() -> wrap(em -> listitemnames(em)), executionContext);
    }
    private Stream<String> listitemnames(EntityManager em) {
        String s="Available";
        List<String> items = em.createQuery("select distinct itemName from Item where status=:s", String.class).setParameter("s",s).getResultList();
        return items.stream();
    }
    @Override
    public CompletionStage<Stream<Double>> getavgrating(String owner) {
        return supplyAsync(() -> wrap(em -> getavgrating(em,owner)), executionContext);
    }
    private Stream<Double> getavgrating(EntityManager em,String owner)
    {
        List<Double> items = em.createQuery("select AVG(rate2) from Item  where  owner=:owner ",Double.class).setParameter("owner",owner).getResultList();
        return items.stream();
    }
    @Override
    public CompletionStage<Stream<Item>> listBorrow(String owner) {
        return supplyAsync(() -> wrap(em -> listborrow(em,owner)), executionContext);
    }
    private Stream<Item> listborrow(EntityManager em,String owner) {
        String s="Available";
        String cat="Borrow";
        LocalDate today = LocalDate.now();

        String t=today.toString();
        //System.out.println("Today's Local date : " + t);
        List<Item> items = em.createQuery("select i from Item i where status=:s and not owner=:owner and category=:cat and toDate>=: t", Item.class).setParameter("t",t).setParameter("s",s).setParameter("owner",owner).setParameter("cat",cat).getResultList();
        return items.stream();
    }
    @Override
    public CompletionStage<Stream<Item>> listDonate(String owner) {
        return supplyAsync(() -> wrap(em -> listdonate(em,owner)), executionContext);
    }
    private Stream<Item> listdonate(EntityManager em,String owner) {
        String s="Available";
        String cat="Donate";
        List<Item> items = em.createQuery("select i from Item i where status=:s and not owner=:owner and category=:cat", Item.class).setParameter("s",s).setParameter("owner",owner).setParameter("cat",cat).getResultList();
        return items.stream();
    }
    @Override
    public CompletionStage<Stream<Item>> listUploaded(String owner) {
        return supplyAsync(() -> wrap(em -> listUpload(em,owner)), executionContext);
    }
    private Stream<Item> listUpload(EntityManager em,String owner) {
        //String s="Available";
        List<Item> items = em.createQuery("select i from Item i where owner=:owner", Item.class).setParameter("owner",owner).getResultList();
        return items.stream();
    }

    @Override
    public CompletionStage<Stream<Item>> listTaken(String customer) {
        return supplyAsync(() -> wrap(em -> listTake(em,customer)), executionContext);
    }
    private Stream<Item> listTake(EntityManager em,String customer) {
        //String s="Available";
        List<Item> items = em.createQuery("select i from Item i where customer=:customer", Item.class).setParameter("customer",customer).getResultList();
        return items.stream();
    }





    @Override
    public CompletionStage<Item> buyItem(String customer,Long id,String takenAt) {
        return supplyAsync(() -> wrap(em -> buyItems(em, customer,id,takenAt)), executionContext);
    }

    private Item buyItems(EntityManager em,String customer,Long id,String takenAt){
        String s="Unavailable";
        int foundItem = em.createQuery("update Item SET customer=:customer,status=:s where id=:id").setParameter("customer",customer).setParameter("id", id).setParameter("s", s).executeUpdate();
        if (foundItem != 0) {

            Item items = em.createQuery("select p from Item p where id=:id",Item.class).setParameter("id", id).getSingleResult();
            String trans1="{\"itemName\":\"" + items.itemName + "\",\"owner\":\""+items.owner+"\",\"customer\":\""+customer+"\",\"takenAt\":\""+takenAt+"\"}";
            // em.createQuery("insert into Transaction(itemName,owner,customer) values(itemName,owner,customer)").setParameter("customer", customer).setParameter("owner", items.owner).setParameter("itemName", items.itemName);
            //JsonNode transaction=JsonNode.toJson(trans1);
            transactionController.addTransaction(trans1);
            return items;
        } else {
            return null;
        }

    }

    @Override
    public CompletionStage<Item> del(String owner,Long id) {
        return supplyAsync(() -> wrap(em -> delete(em, owner,id)), executionContext);
    }
    private Item delete(EntityManager em, String owner,Long id) {
        Item item = em.createQuery("select i from Item i where i.owner=:owner and i.id=:id", Item.class).setParameter("owner", owner).setParameter("id", id).getSingleResult();
        em.remove(item);
        return item;
    }

    @Override
    public CompletionStage<Item> edit(Long id,Integer price,String description,String address,String category,String fromDate,String toDate) {
        return supplyAsync(() -> wrap(em -> editvalue(em, id, price,description,address,category,fromDate,toDate)), executionContext);
    }

    private Item editvalue(EntityManager em, Long id, Integer price,String description,String address,String category,String fromDate,String toDate) {
        String status="Available";
        int i = em.createQuery("update Item SET price=:price,description=:description,address=:address,category=:category,fromDate=:fromDate,toDate=:toDate where id=:id and status=:status").setParameter("fromDate", fromDate).setParameter("toDate", toDate).setParameter("id", id).setParameter("price", price).setParameter("address", address).setParameter("description", description).setParameter("category", category).setParameter("status", status).executeUpdate();
        //int i=q.executeUpdate();
        if (i != 0) {
            Item items = em.createQuery("select i from Item i where id=:id", Item.class).setParameter("id", id).getSingleResult();
            return items;
        } else {
            return null;
        }
    }


    @Override
    public Item details(Long id){
        return  wrap(em -> details(em, id));
    }

    private Item details(EntityManager em,Long id) throws NoResultException {
        try {

            Item foundItem = em.createQuery("select p from Item p where id=:id ", Item.class).setParameter("id", id).getSingleResult();
            //em.remove(foundPerson);
            return foundItem;
        } catch (NoResultException e) {
            return null;
        }


    }
    @Override
    public CompletionStage<Stream<Item>> getSearchItems(String search,String owner){
        return supplyAsync(() -> wrap(em -> getSearchItems(em, search,owner)), executionContext);
    }
    private Stream<Item>  getSearchItems(EntityManager em,String search,String owner) {
        String sc="%"+search+"%";
        List<Item> items = em.createQuery("select p from Item p where (p.itemName LIKE  :search or p.description LIKE  :search) and status=:s and not owner=:owner").setParameter("search",sc).setParameter("owner",owner).setParameter("s","Available").getResultList();
        return items.stream();
    }

    @Override
    public CompletionStage<Item> borrowItem(String customer,Long id,String takenAt) {
        return supplyAsync(() -> wrap(em -> borrowItems(em, customer,id,takenAt)), executionContext);
    }

    private Item borrowItems(EntityManager em,String customer,Long id,String takenAt){
        String s="Unavailable";
        int foundItem = em.createQuery("update Item SET customer=:customer,status=:s where id=:id").setParameter("customer",customer).setParameter("id", id).setParameter("s", s).executeUpdate();
        if (foundItem != 0) {
            Item items = em.createQuery("select p from Item p where id=:id",Item.class).setParameter("id", id).getSingleResult();
            String trans1="{\"itemName\":\"" + items.itemName + "\",\"owner\":\""+items.owner+"\",\"customer\":\""+customer+"\",\"takenAt\":\""+takenAt+"\"}";
            transactionController.addTransaction(trans1);
            return items;
        } else {
            return null;
        }

    }
    @Override
    public CompletionStage<Item> returnItem(String customer,Long id,String returnedAt) {
        return supplyAsync(() -> wrap(em -> returnItem(em, customer,id,returnedAt)), executionContext);
    }

    private Item returnItem(EntityManager em,String customer,Long id,String returnedAt){
        String s="Available";
        int foundItem = em.createQuery("update Item SET customer=:null,status=:s where id=:id").setParameter("id", id).setParameter("s", s).setParameter("null", null).executeUpdate();
        if (foundItem != 0) {
            Item items = em.createQuery("select p from Item p where id=:id",Item.class).setParameter("id", id).getSingleResult();
            int u = em.createQuery("update Transaction SET returnedAt=:returnedAt where itemName=:itemName and customer=:customer and owner=:owner and returnedAt is null").setParameter("itemName", items.itemName).setParameter("returnedAt", returnedAt).setParameter("customer", customer).setParameter("owner", items.owner).executeUpdate();
            return items;
        } else {
            return null;
        }

    }



    /*@Override
    public CompletionStage<Double> getavgrating(String owner) {
        return supplyAsync(() -> wrap(em -> getavgrating(em,owner)), executionContext);
    }
    private Double getavgrating(EntityManager em,String owner)

    {

        Double i = em.createQuery("select AVG(rate2) from Item  where  owner=:owner ",Double.class).setParameter("owner",owner).getSingleResult();
        return i;
    }*/


}
