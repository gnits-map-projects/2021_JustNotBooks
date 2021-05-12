package models;

        import com.google.inject.ImplementedBy;

        import java.util.concurrent.CompletionStage;
        import java.util.stream.Stream;

/**
 * This interface provides a non-blocking API for possibly blocking operations.
 */
@ImplementedBy(JPAPersonRepository.class)
public interface PersonRepository {

    CompletionStage<Person> add(Person person);

    CompletionStage<Stream<Person>> list();
    CompletionStage<Stream<Person>> listuser(String username,String password);

    CompletionStage<Person> del(String name);

    abstract Person login(String username,String password);
    abstract Person profile(String username);
    public CompletionStage<Person> edit(String name,String email,Long phoneNumber);
    public CompletionStage<Person> editPswd(String name,String oldPswd,String newPswd);
    public CompletionStage<Person> resetPswd(String name,String newPswd);
    abstract Person checkName(String Name);


}
