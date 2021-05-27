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
import java.sql.*;
import javax.persistence.NoResultException;


import static java.util.concurrent.CompletableFuture.supplyAsync;

/**
 * Provide JPA operations running inside of a thread pool sized to the connection pool
 */
public class JPAPersonRepository implements PersonRepository {


    private final JPAApi jpaApi;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public JPAPersonRepository(JPAApi jpaApi, DatabaseExecutionContext executionContext) {
        this.jpaApi = jpaApi;
        this.executionContext = executionContext;
    }

    @Override
    public CompletionStage<Person> add(Person person) {
        return supplyAsync(() -> wrap(em -> insert(em, person)), executionContext);
    }
    @Override
    public CompletionStage<Integer> addReview(String review,String name,Long rate) {
        return supplyAsync(() -> wrap(em -> insertreview(em, review,name,rate)), executionContext);
    }

    @Override
    public CompletionStage<Stream<Person>> list() {

        return supplyAsync(() -> wrap(em -> list(em)), executionContext);
    }

    @Override
    public CompletionStage<Person> del(String name) {
        return supplyAsync(() -> wrap(em -> delete(em, name)), executionContext);
    }

    @Override
    public CompletionStage<Person> edit(String name, String email, Long phoneNumber,String address) {
        return supplyAsync(() -> wrap(em -> editvalue(em, name, email, phoneNumber,address)), executionContext);
    }

    @Override
    public CompletionStage<Stream<Person>> listuser(String username, String password) {
        return supplyAsync(() -> wrap(em -> listuser(em, username, password)), executionContext);
    }

    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }

    private Person insert(EntityManager em, Person person) {
        em.persist(person);
        return person;
    }

    private Person delete(EntityManager em, String name) {
        Person person = em.createQuery("select p from Person p where p.name=:name", Person.class).setParameter("name", name).getSingleResult();
        em.remove(person);
        return person;
    }

    private Person editvalue(EntityManager em, String name, String email, Long phoneNumber, String address) {
        int i = em.createQuery("update Person SET email=:email,phoneNumber=:phoneNumber,address=:address where name=:name").setParameter("name", name).setParameter("email", email).setParameter("phoneNumber", phoneNumber).setParameter("address", address).executeUpdate();
        //int i=q.executeUpdate();
        if (i != 0) {
            Person persons = em.createQuery("select p from Person p where name=:name", Person.class).setParameter("name", name).getSingleResult();
            return persons;
        } else {
            return null;
        }
    }

    private Stream<Person> list(EntityManager em) {
        List<Person> persons = em.createQuery("select p from Person p", Person.class).getResultList();
        return persons.stream();
    }


    private Stream<Person> listuser(EntityManager em, String username, String password) {
        try {
            List<Person> persons = em.createQuery("select p from Person p where name=:username and pswd=:password", Person.class).setParameter("username", username).setParameter("password", password).getResultList();
            return persons.stream();

        } catch (NoResultException e) {
            return null;
        }

    }

    @Override
    public Person login(String username, String password) {
        return wrap(em -> findPerson(em, username, password));
    }

    private Person findPerson(EntityManager em, String username, String password) throws NoResultException {
        try {
            Person foundPerson = em.createQuery("select p from Person p where name=:username and pswd=:password", Person.class).setParameter("username", username).setParameter("password", password).getSingleResult();
            return foundPerson;
        }
        catch(NoResultException e){
            return null;
        }
    }

    @Override
    public Person profile(String name) {
        return wrap(em -> profile(em, name));
    }

    private Person profile(EntityManager em,String name) throws NoResultException {
        try {
            Person foundPerson = em.createQuery("select p from Person p where name=:name ", Person.class).setParameter("name", name).getSingleResult();
            //em.remove(foundPerson);
            return foundPerson;
        } catch (NoResultException e) {
            return null;
        }


    }


    @Override
    public Person checkName(String name) {
        return wrap(em -> checkName(em, name));
    }

    private Person checkName(EntityManager em,String name) {
        try {
            Person PersonProfile = em.createQuery("select p from Person p where name=:name", Person.class).setParameter("name", name).getSingleResult();
            //em.remove(foundPerson);getSingleResult();
            //em.remove(foundPerson);
            return PersonProfile;
        } catch (NoResultException e) {
            return null;
        }

    }
    @Override
    public CompletionStage<Person> editPswd(String name, String oldPswd, String newPswd) {
        return supplyAsync(() -> wrap(em -> editPswd(em, name, oldPswd,newPswd)), executionContext);
    }
    private Person editPswd(EntityManager em, String name, String oldPswd, String newPswd) {
        int i = em.createQuery("update Person SET pswd =: newPswd where name=:name").setParameter("name", name).setParameter("newPswd", newPswd).executeUpdate();
        //int i=q.executeUpdate();
        if (i != 0) {
            Person persons = em.createQuery("select p from Person p where name=:name", Person.class).setParameter("name", name).getSingleResult();
            return persons;
        } else {
            return null;
        }
    }

    @Override
    public CompletionStage<Person> resetPswd(String name,String newPswd) {
        return supplyAsync(() -> wrap(em -> resetPswd(em,name,newPswd)), executionContext);
    }
    private Person resetPswd(EntityManager em, String name, String newPswd) {
        int i = em.createQuery("update Person SET pswd =: newPswd where name=:name").setParameter("name", name).setParameter("newPswd", newPswd).executeUpdate();
        //int i=q.executeUpdate();
        if (i != 0) {
            Person persons = em.createQuery("select p from Person p where name=:name", Person.class).setParameter("name", name).getSingleResult();
            return persons;
        } else {
            return null;
        }
    }
    private int insertreview(EntityManager em, String review,String name,Long rate) {
        int i = em.createQuery("update Person SET review =: r ,rating=: ra where name=:name").setParameter("name", name).setParameter("ra", rate).setParameter("r", review).executeUpdate();
        return i;
    }
}