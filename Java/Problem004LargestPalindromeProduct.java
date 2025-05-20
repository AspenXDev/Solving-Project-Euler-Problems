package Java;
/**
 * This program finds the largest prime factor of a given number using trial division.
 * It first removes all factors of 2, then checks for odd factors starting from 3.
 * The largest prime factor is returned.
 */

public class Problem004LargestPalindromeProduct {

    public static boolean isPalindrome(int n) {
        String s = String.valueOf(n);
        String reversedS = new StringBuilder(s).reverse().toString();
        return s.equals(reversedS);
    }

    public static int largestPalindromeProduct() {
        int largest = 0;

        for (int a = 999; a >= 100; a--) {
            for (int b = a; b >= 100; b--) { // Avoid duplicate pairs
                int product = a * b;
                if (product <= largest) {
                    break; // No need to check smaller products for this 'a'
                }
                if (isPalindrome(product)) {
                    largest = product;
                }
            }
        }
        return largest;
    }

    public static void main(String[] args) {
        int largestPalindrome = largestPalindromeProduct();
        System.out.println("The largest palindrome made from the product of two 3-digit numbers is: " + largestPalindrome);
    }
}