const { sumMultiplesOf, calculateSumOfMultiplesLogic } = require('../Problem001SumMultiples');

describe('sumMultiplesOf', () => {
    test('calculates sum for a single divisor', () => {
        expect(sumMultiplesOf(3, 10)).toBe(18); // 3 + 6 + 9 = 18
    });

    test('no multiples found', () => {
        expect(sumMultiplesOf(3, 3)).toBe(0); // No multiples of 3 strictly below 3
    });
    
    test('no multiples found when limit is small', () => {
        expect(sumMultiplesOf(10, 5)).toBe(0); // No multiples of 10 strictly below 5
    });

    test('throws error for non-positive divisor', () => {
        expect(() => sumMultiplesOf(0, 10)).toThrowError(/positive integers/);
        expect(() => sumMultiplesOf(-1, 10)).toThrowError(/positive integers/);
    });

    test('throws error for non-positive limit', () => {
        expect(() => sumMultiplesOf(3, 0)).toThrowError(/positive integers/);
        expect(() => sumMultiplesOf(3, -1)).toThrowError(/positive integers/);
    });

    test('throws error for non-integer divisor', () => {
        expect(() => sumMultiplesOf(3.5, 10)).toThrowError(/positive integers/);
    });

    test('throws error for non-integer limit', () => {
        expect(() => sumMultiplesOf(3, 10.5)).toThrowError(/positive integers/);
    });
});

describe('calculateSumOfMultiplesLogic', () => {
    test('Euler example (3, 5, 10)', () => {
        // Multiples of 3: 3, 6, 9
        // Multiples of 5: 5
        // Common (15): None
        // Sum = (3+6+9) + 5 - 0 = 18 + 5 = 23
        expect(calculateSumOfMultiplesLogic(3, 5, 10)).toBe(23);
    });

    test('Project Euler problem (3, 5, 1000)', () => {
        expect(calculateSumOfMultiplesLogic(3, 5, 1000)).toBe(233168);
    });

    test('custom case (2, 7, 15)', () => {
        // Multiples of 2: 2, 4, 6, 8, 10, 12, 14. Sum = 56
        // Multiples of 7: 7, 14. Sum = 21
        // Common (14): 14. Sum = 14
        // Sum = 56 + 21 - 14 = 77 - 14 = 63
        expect(calculateSumOfMultiplesLogic(2, 7, 15)).toBe(63);
    });

    test('one divisor multiple of other (2, 4, 10)', () => {
        // Multiples of 2: 2, 4, 6, 8. Sum = 20
        // Multiples of 4: 4, 8. Sum = 12
        // Common (2*4=8): 8. Sum = 8
        // Sum = 20 + 12 - 8 = 24
        expect(calculateSumOfMultiplesLogic(2, 4, 10)).toBe(24);
    });

    test('no multiples found', () => {
        expect(calculateSumOfMultiplesLogic(7, 11, 5)).toBe(0);
    });

    test('throws error for non-positive divisor1', () => {
        expect(() => calculateSumOfMultiplesLogic(0, 5, 10)).toThrowError(/positive integers/);
        expect(() => calculateSumOfMultiplesLogic(-1, 5, 10)).toThrowError(/positive integers/);
    });

    test('throws error for non-positive divisor2', () => {
        expect(() => calculateSumOfMultiplesLogic(3, 0, 10)).toThrowError(/positive integers/);
        expect(() => calculateSumOfMultiplesLogic(3, -5, 10)).toThrowError(/positive integers/);
    });

    test('throws error for non-positive limit', () => {
        expect(() => calculateSumOfMultiplesLogic(3, 5, 0)).toThrowError(/positive integers/);
        expect(() => calculateSumOfMultiplesLogic(3, 5, -1)).toThrowError(/positive integers/);
    });

    test('throws error for non-integer divisor1', () => {
        // The error message from sumMultiplesOf is "Inputs to sumMultiplesOf must be positive integers."
        // The error message from calculateSumOfMultiplesLogic for non-integer is "All inputs must be integers."
        // calculateSumOfMultiplesLogic checks for integer type first.
        expect(() => calculateSumOfMultiplesLogic(3.5, 5, 10)).toThrowError(/All inputs must be integers/);
    });
    
    test('throws error for non-integer divisor2', () => {
        expect(() => calculateSumOfMultiplesLogic(3, 5.5, 10)).toThrowError(/All inputs must be integers/);
    });

    test('throws error for non-integer limit', () => {
        expect(() => calculateSumOfMultiplesLogic(3, 5, 10.5)).toThrowError(/All inputs must be integers/);
    });
});
