const { calculateEvenFibonacciSumBasic } = require('../Problem002Fibonacci-basic.js');
const { calculateEvenFibonacciSumRecursive } = require('../Problem002Fibonacci-recursive.js');
const { calculateEvenFibonacciSumSliding } = require('../Problem002Fibonacci-sliding.js');

const testCases = [
    { fn: calculateEvenFibonacciSumBasic, name: 'calculateEvenFibonacciSumBasic', errorRegex: /Please enter a valid positive integer for the limit.|Limit must be a positive integer./ },
    { fn: calculateEvenFibonacciSumRecursive, name: 'calculateEvenFibonacciSumRecursive', errorRegex: /Limit must be a positive integer./ },
    { fn: calculateEvenFibonacciSumSliding, name: 'calculateEvenFibonacciSumSliding', errorRegex: /Limit must be a positive integer./ }
];

testCases.forEach(({ fn, name, errorRegex }) => {
    describe(name, () => {
        test('should return correct sum for Project Euler limit 4,000,000', () => {
            expect(fn(4000000)).toBe(4613732);
        });

        // Small Limits
        test('limit 1 should return 0', () => {
            // For sliding, first even is 2. For basic/recursive, sequence starts 1,2.
            // All functions should return 0 if limit < 2.
            expect(fn(1)).toBe(0);
        });

        test('limit 2 should return 2', () => {
            expect(fn(2)).toBe(2);
        });

        test('limit 7 should return 2', () => {
            // Fibonacci: 1, 2, 3, 5, 8. Even sum: 2.
            // Sliding even: 2, 8. Even sum: 2.
            expect(fn(7)).toBe(2);
        });

        test('limit 8 should return 10', () => {
            // Fibonacci: 1, 2, 3, 5, 8. Even sum: 2 + 8 = 10.
            // Sliding even: 2, 8. Even sum: 2 + 8 = 10.
            expect(fn(8)).toBe(10);
        });
        
        test('limit 10 should return 10', () => {
            // Fibonacci: 1, 2, 3, 5, 8, 13. Even sum: 2 + 8 = 10.
            // Sliding even: 2, 8, 34. Even sum for limit 10 is 2 + 8 = 10.
            expect(fn(10)).toBe(10);
        });

        test('limit 33 should return 10', () => {
            // Fibonacci: ..., 8, ..., 34. Even sum up to 33 is 2 + 8 = 10.
            // Sliding even: 2, 8, 34. Even sum up to 33 is 2 + 8 = 10.
            expect(fn(33)).toBe(10);
        });

        test('limit 34 should return 44', () => {
            // Fibonacci: ..., 8, ..., 34. Even sum: 2 + 8 + 34 = 44.
            // Sliding even: 2, 8, 34. Even sum: 2 + 8 + 34 = 44.
            expect(fn(34)).toBe(44);
        });

        // Invalid Inputs
        test('limit 0 should throw error', () => {
            expect(() => fn(0)).toThrowError(errorRegex);
        });

        test('limit -5 should throw error', () => {
            expect(() => fn(-5)).toThrowError(errorRegex);
        });

        test('limit 1.5 should throw error (non-integer)', () => {
            // All functions use Number.isInteger(limit)
            expect(() => fn(1.5)).toThrowError(errorRegex);
        });

        test('limit "abc" should throw error (non-numeric leading to NaN, then caught by isInteger)', () => {
            // The core functions receive a value directly. If "abc" is passed, it's not an integer.
            // If parseInt from DOM resulted in NaN, Number.isInteger(NaN) is false.
            expect(() => fn("abc")).toThrowError(errorRegex);
        });
         test('limit NaN should throw error', () => {
            expect(() => fn(NaN)).toThrowError(errorRegex);
        });
    });
});
