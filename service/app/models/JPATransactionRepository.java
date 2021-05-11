package models;

import play.db.jpa.JPAApi;

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


import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public class JPATransactionRepository implements TransactionRepository {

    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;
    //public enum status{Available,Unavailable};

    @Inject
    public JPATransactionRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
    }
    @Override
    public CompletionStage<Stream<Long>> getNumberOfTransac() {
        return supplyAsync(() -> wrap(em -> getNumberOfTransac(em)), executionContext);
    }
    private Stream<Long> getNumberOfTransac(EntityManager em) {
        List<Long> transacCount = em.createQuery("select count(*) from Transaction", Long.class).getResultList();
        return transacCount.stream();
    }
    @Override
    public CompletionStage<Transaction> add(Transaction transaction) {
        return supplyAsync(() -> wrap(em -> insert(em, transaction)), executionContext);
    }


    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }

    private Transaction insert(EntityManager em, Transaction transaction) {
        em.persist(transaction);
        return transaction;
    }



}
