package Java;
/**
 * This program calculates the sum of all multiples of 3 or 5 below a given limit using the arithmetic progression sum formula.
 * It avoids double counting by subtracting the sum of multiples of both 3 and 5 (i.e., multiples of 15).
 */
public class ArithmeticProgressionSum {

    /**
     * Uses the arithmetic progression sum formula to compute the sum of multiples of 'd' below 'limit'.
     *
     * @param firstTerm The first term of the arithmetic progression.
     * @param d         The common difference (the number we are finding multiples of).
     * @param limit     The upper limit (exclusive).
     * @return The sum of the arithmetic progression.
     */
    public static int sumAPOf(int firstTerm, int d, int limit) {
        int n = (limit - 1) / d; // Number of terms in the sequence
        return (n * (2 * firstTerm + (n - 1) * d)) / 2; // AP sum formula
    }

    public static void main(String[] args) {
        int limit = 1000;
        int sumMultiplesOf3 = sumAPOf(3, 3, limit);
        int sumMultiplesOf5 = sumAPOf(5, 5, limit);
        int sumMultiplesOf15 = sumAPOf(15, 15, limit); // Multiples of both 3 and 5 (to avoid double counting)

        int sumAllAP = sumMultiplesOf3 + sumMultiplesOf5 - sumMultiplesOf15;

        System.out.println("Sum of multiples of 3 or 5 below 1000 (AP series method): " + sumAllAP);
    }
}