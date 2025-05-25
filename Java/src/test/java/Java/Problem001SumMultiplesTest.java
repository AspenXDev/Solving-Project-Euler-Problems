package Java;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

// Import static methods to be tested
import static Java.Problem001SumMultiples.*;

class Problem001SumMultiplesTest {

    // --- Tests for sumMultiples ---
    @Test
    void testSumMultiples_Example() {
        assertEquals(18, sumMultiples(3, 10), "Sum of multiples of 3 below 10 should be 18 (3+6+9)");
    }

    @Test
    void testSumMultiples_NoMultiples() {
        assertEquals(0, sumMultiples(3, 3), "No multiples of 3 strictly below 3");
    }

    @Test
    void testSumMultiples_InvalidDivisor() {
        assertThrows(IllegalArgumentException.class, () -> sumMultiples(0, 10), "Divisor 0 should throw IllegalArgumentException");
        assertThrows(IllegalArgumentException.class, () -> sumMultiples(-1, 10), "Negative divisor should throw IllegalArgumentException");
    }

    @Test
    void testSumMultiples_InvalidLimit() {
        assertThrows(IllegalArgumentException.class, () -> sumMultiples(3, 0), "Limit 0 should throw IllegalArgumentException");
        assertThrows(IllegalArgumentException.class, () -> sumMultiples(3, -1), "Negative limit should throw IllegalArgumentException");
    }

    // --- Tests for calculateSumOfMultiplesForTwoDivisors ---
    @Test
    void testCalculateSum_EulerExample() {
        assertEquals(23, calculateSumOfMultiplesForTwoDivisors(3, 5, 10), "Sum for (3, 5, 10) should be 23");
    }

    @Test
    void testCalculateSum_ProjectEulerProblem() {
        assertEquals(233168, calculateSumOfMultiplesForTwoDivisors(3, 5, 1000), "Sum for (3, 5, 1000) should be 233168");
    }

    @Test
    void testCalculateSum_CustomCase() {
        // Multiples of 2: 2,4,6,8,10,12,14 -> sum 56
        // Multiples of 7: 7,14 -> sum 21
        // Multiples of 14: 14 -> sum 14
        // Result: 56 + 21 - 14 = 63
        assertEquals(63, calculateSumOfMultiplesForTwoDivisors(2, 7, 15), "Sum for (2, 7, 15) should be 63");
    }

    @Test
    void testCalculateSum_OneDivisorMultipleOfOther() {
        // sumMultiples(2,10) = 2+4+6+8 = 20
        // sumMultiples(4,10) = 4+8 = 12
        // sumMultiples(2*4=8,10) = 8
        // Result = 20 + 12 - 8 = 24
        assertEquals(24, calculateSumOfMultiplesForTwoDivisors(2, 4, 10), "Sum for (2, 4, 10) should be 24 using d1*d2 for exclusion");
    }

    @Test
    void testCalculateSum_NoMultiples() {
        assertEquals(0, calculateSumOfMultiplesForTwoDivisors(7, 11, 5), "No multiples for (7, 11, 5) should result in 0");
    }

    @Test
    void testCalculateSum_InvalidDivisor1() {
        assertThrows(IllegalArgumentException.class, () -> calculateSumOfMultiplesForTwoDivisors(0, 5, 10), "Divisor1 0 should throw IllegalArgumentException");
    }

    @Test
    void testCalculateSum_InvalidDivisor2() {
        assertThrows(IllegalArgumentException.class, () -> calculateSumOfMultiplesForTwoDivisors(3, -5, 10), "Negative Divisor2 should throw IllegalArgumentException");
    }

    @Test
    void testCalculateSum_InvalidLimit() {
        assertThrows(IllegalArgumentException.class, () -> calculateSumOfMultiplesForTwoDivisors(3, 5, 0), "Limit 0 should throw IllegalArgumentException");
    }
}
