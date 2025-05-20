package Java;
/**
 * This program finds the largest prime factor of a given number using trial division.
 * It first removes all factors of 2, then checks for odd factors starting from 3.
 * The largest prime factor is returned.
 */
// This code calculates the sum of all multiples of 3 or 5 below a given limit.
// It uses a simple loop to find the multiples and sum them up.
public class Problem001SumMultiples {

    /**
     * Calculates the sum of all numbers below 'limit' that are multiples of 'divisibleBy'.
     *
     * @param divisibleBy The number to find multiples of.
     * @param limit       The upper limit (exclusive).
     * @return The sum of the multiples.
     */
    public static int sumMultiples(int divisibleBy, int limit) {
        int sum = 0;
        for (int i = 0; i < limit; i++) {
            if (i % divisibleBy == 0) {
                sum += i;
            }
        }
        return sum;
    }

    public static void main(String[] args) {
        int multiple1 = 3;
        int multiple2 = 5;
        int limit = 1000;

        long startTime = System.currentTimeMillis();

        int sumAllMultiples = sumMultiples(multiple1, limit) +
                                sumMultiples(multiple2, limit) -
                                sumMultiples(multiple1 * multiple2, limit);

        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;

        System.out.println("Sum of multiples of " + multiple1 + " or " + multiple2 +
                           " below " + limit + ": " + sumAllMultiples);
        System.out.println("Execution Time: " + executionTime + " ms");

        // You can modify the 'multiple1', 'multiple2', and 'limit' variables here
        // to test with different inputs.
    }
}