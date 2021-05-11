package models;

import com.google.inject.ImplementedBy;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

/**
 * This interface provides a non-blocking API for possibly blocking operations.
 */
@ImplementedBy(JPATransactionRepository.class)
public interface TransactionRepository {

    CompletionStage<Stream<Long>> getNumberOfTransac();
    CompletionStage<Transaction> add(Transaction transaction);

}
