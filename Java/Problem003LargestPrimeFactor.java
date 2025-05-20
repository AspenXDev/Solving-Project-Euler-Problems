package Java;
/**
 * This program finds the largest prime factor of a given number using trial division.
 * It first removes all factors of 2, then checks for odd factors starting from 3.
 * The largest prime factor is returned.
 */
public class Problem003LargestPrimeFactor {

    public static long largestPrimeFactor(long n) {
        long factor = 2;

        // Remove all factors of 2
        while (n % 2 == 0) {
            n /= 2;
        }

        // Check odd numbers from 3 onwards
        factor = 3;
        while (factor * factor <= n) {
            while (n % factor == 0) {
                n /= factor;
            }
            factor += 2; // Increment by 2 to check only odd numbers
        }

        // If there's a prime factor left (greater than 1), it's the largest;
        // otherwise, the last factor checked (which might be the original n if it was prime)
        return (n > 1) ? n : factor;
    }

    public static void main(String[] args) {
        long number = 600851475143L; // Example from Project Euler
        long largestFactor = largestPrimeFactor(number);
        System.out.println("The largest prime factor of " + number + " is: " + largestFactor);

        long anotherNumber = 13195; // Another example
        long anotherLargestFactor = largestPrimeFactor(anotherNumber);
        System.out.println("The largest prime factor of " + anotherNumber + " is: " + anotherLargestFactor);
    }
}