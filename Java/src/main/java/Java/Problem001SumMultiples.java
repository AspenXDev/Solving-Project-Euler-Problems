package Java;

/**
 * Solves Project Euler Problem 1: Sum of Multiples.
 * This class provides methods to find the sum of all multiples of two specified
 * numbers (e.g., 3 and 5) that are strictly below a given limit (e.g., 1000).
 * The core logic employs the Inclusion-Exclusion Principle.
 */
public class Problem001SumMultiples {

    /**
     * Calculates the sum of all numbers strictly below {@code limit} that are
     * multiples of a single number {@code divisibleBy}.
     *
     * @param divisibleBy The number whose multiples are to be summed. Must be a positive integer.
     * @param limit       The exclusive upper bound for the multiples. Must be a positive integer.
     * @return The sum of the multiples of {@code divisibleBy} below {@code limit}.
     * @throws IllegalArgumentException if {@code divisibleBy} or {@code limit} is not a positive integer.
     */
    public static int sumMultiples(int divisibleBy, int limit) {
        // Validate inputs: divisibleBy and limit must be positive.
        if (divisibleBy <= 0 || limit <= 0) {
            throw new IllegalArgumentException("Inputs to sumMultiples (divisibleBy, limit) must be positive integers.");
        }
        int sum = 0;
        // Iterate from 0 up to (but not including) limit.
        for (int i = 0; i < limit; i++) {
            // If 'i' is a multiple of 'divisibleBy', add it to the sum.
            if (i % divisibleBy == 0) {
                sum += i;
            }
        }
        return sum;
    }

    /**
     * Calculates the sum of all numbers strictly below {@code limit} that are multiples
     * of {@code divisor1} OR {@code divisor2}.
     *
     * This method uses the Inclusion-Exclusion Principle:
     * Sum(A or B) = Sum(A) + Sum(B) - Sum(A and B).
     * In this context:
     * - Sum(A) is the sum of multiples of {@code divisor1}.
     * - Sum(B) is the sum of multiples of {@code divisor2}.
     * - Sum(A and B) is the sum of multiples of numbers divisible by both {@code divisor1}
     *   and {@code divisor2}. This is implemented by finding multiples of {@code divisor1 * divisor2}.
     *   This assumes that for common multiples, we consider multiples of their product,
     *   which is standard for Project Euler Problem 1 (e.g., for 3 and 5, common multiples are multiples of 15).
     *
     * @param divisor1 The first number whose multiples are considered. Must be a positive integer.
     * @param divisor2 The second number whose multiples are considered. Must be a positive integer.
     * @param limit    The exclusive upper bound for the multiples. Must be a positive integer.
     * @return The sum of multiples of {@code divisor1} or {@code divisor2} below {@code limit}.
     * @throws IllegalArgumentException if {@code divisor1}, {@code divisor2}, or {@code limit}
     *                                  is not a positive integer.
     */
    public static int calculateSumOfMultiplesForTwoDivisors(int divisor1, int divisor2, int limit) {
        // Validate inputs: all arguments must be positive integers.
        if (divisor1 <= 0 || divisor2 <= 0 || limit <= 0) {
            throw new IllegalArgumentException("All inputs (divisor1, divisor2, limit) must be positive integers.");
        }

        // Calculate sum of multiples for the first divisor.
        int sumDivisor1 = sumMultiples(divisor1, limit);
        // Calculate sum of multiples for the second divisor.
        int sumDivisor2 = sumMultiples(divisor2, limit);
        // Calculate sum of common multiples (multiples of divisor1 * divisor2)
        // to subtract the overlap, according to the Inclusion-Exclusion Principle.
        int sumCommonMultiples = sumMultiples(divisor1 * divisor2, limit);

        // Apply the Inclusion-Exclusion Principle to get the final sum.
        return sumDivisor1 + sumDivisor2 - sumCommonMultiples;
    }

    /**
     * Main method to demonstrate the functionality of the Problem001SumMultiples class.
     * It calculates the sum of multiples for example inputs and prints the result
     * and execution time, or an error message if inputs are invalid.
     *
     * @param args Command-line arguments (not used).
     */
    public static void main(String[] args) {
        // Example input values for Project Euler Problem 1 (multiples of 3 or 5 below 1000).
        int multiple1 = 3;
        int multiple2 = 5;
        int limit = 1000;

        // Uncomment to test with invalid (non-positive) input for error handling demonstration:
        // int multiple1 = -3; // This would trigger an IllegalArgumentException.

        // Variables to store timing information.
        long startTime = 0;
        long endTime = 0;
        long executionTime = 0;

        // Try-catch block to handle potential input errors (IllegalArgumentException)
        // from the calculation methods and to manage execution timing.
        try {
            // Record start time before the calculation.
            startTime = System.currentTimeMillis();
            // Call the core logic function to calculate the sum.
            int sumAllMultiples = calculateSumOfMultiplesForTwoDivisors(multiple1, multiple2, limit);
            // Record end time after the calculation.
            endTime = System.currentTimeMillis();
            // Calculate total execution time in milliseconds.
            executionTime = endTime - startTime;

            // Print the successful result to System.out.
            System.out.println("Sum of multiples of " + multiple1 + " or " + multiple2 +
                               " below " + limit + ": " + sumAllMultiples);
            // Print the execution time to System.out.
            System.out.println("Execution Time: " + executionTime + " ms");

        } catch (IllegalArgumentException e) {
            // This block executes if an IllegalArgumentException is thrown by the calculation methods.
            // Record end time if an error occurred during or after startTime was set.
            if (startTime != 0 && endTime == 0) { // Ensures endTime is captured if error happened mid-process.
                endTime = System.currentTimeMillis();
            }
            executionTime = endTime - startTime; // Calculate duration until error.

            // Print the error message from the exception to System.err.
            System.err.println("Error: " + e.getMessage());
            // Print the approximate execution time until the error to System.err.
            System.err.println("Execution attempt took approximately: " + executionTime + " ms (check inputs)");
        }

        // Informative comment for users wishing to test with different values.
        // System.out.println("You can modify the 'multiple1', 'multiple2', and 'limit' variables in main() " +
        //                    "to test with different inputs, including non-positive ones for error checking.");
    }
}