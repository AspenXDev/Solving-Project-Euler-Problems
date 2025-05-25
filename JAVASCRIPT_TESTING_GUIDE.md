# JavaScript Testing Guide (Jest)

This guide provides instructions on how to set up your local environment and run the Jest unit tests for the JavaScript solutions to Project Euler problems.

**Current tests cover:**
*   Problem 1: Sum of Multiples
*   Problem 2: Even Fibonacci Numbers

## Prerequisites

*   **Node.js and npm:** Ensure you have Node.js installed, which includes npm (Node Package Manager). You can download it from [https://nodejs.org/](https://nodejs.org/).
*   **Project Files:** You should have the project code, particularly the `JavaScript` directory containing the solutions and tests.

## Setup Instructions

1.  **Navigate to the JavaScript Directory:**
    Open your terminal or command prompt and change to the `JavaScript` directory within the project:
    ```bash
    cd path/to/your/project/JavaScript
    ```

2.  **Install Dependencies:**
    Once inside the `JavaScript` directory, run the following command to install Jest (which is listed as a dev dependency in `package.json`):
    ```bash
    npm install
    ```
    This command will create a `node_modules` directory inside `JavaScript` containing Jest and its dependencies.

## Running Tests

You can run all tests or specify individual test files.

*   **To run all Jest tests** found in the `JavaScript/tests` directory:
    ```bash
    npm test
    ```
    (This command executes the `jest` script defined in `package.json`)

*   **To run tests for a specific problem file** (e.g., Problem 2 tests):
    ```bash
    npm test Problem002Fibonacci.test.js
    ```
    Or, from the project root, you might use npx if you prefer not to rely on the package.json script for targeted tests:
    ```bash
    npx jest JavaScript/tests/Problem002Fibonacci.test.js
    ```

## Project Configuration Files

For reference and troubleshooting, here are the key configuration files:

### 1. `JavaScript/package.json`

This file defines project dependencies (like Jest) and scripts.

```json
{
  "name": "javascript-solutions",
  "version": "1.0.0",
  "description": "JavaScript solutions for Project Euler problems with Jest tests.",
  "main": "index.js", 
  "scripts": {
    "test": "jest"
  },
  "keywords": [
    "jest",
    "testing",
    "project-euler",
    "javascript"
  ],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^29.7.0" 
  }
}
```

### 2. `JavaScript/jest.config.js` (Optional but Recommended)

This file provides explicit configuration for Jest. If it doesn't exist, Jest will use its defaults. Creating it can help ensure consistency.

```javascript
// JavaScript/jest.config.js
module.exports = {
  rootDir: '.', 
  roots: ['<rootDir>/tests'], 
  testEnvironment: 'node',
  testMatch: [    
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  testPathIgnorePatterns: ['/node_modules/'], 
  verbose: true, 
};
```
*(Ensure this `JavaScript/jest.config.js` is created in the `JavaScript` directory if it's not already there.)*

## Test File Code

### `JavaScript/tests/Problem001SumMultiples.test.js`

```javascript
// Content of JavaScript/tests/Problem001SumMultiples.test.js
// (Worker should insert the full code for Problem001SumMultiples.test.js here,
//  which was created and verified in previous Problem 1 testing steps)
const { sumMultiplesOf, calculateSumOfMultiplesLogic } = require('../Problem001SumMultiples');

describe('sumMultiplesOf', () => {
    test('calculates sum for a single divisor', () => {
        expect(sumMultiplesOf(3, 10)).toBe(18); // 3+6+9
    });
    test('no multiples found', () => {
        expect(sumMultiplesOf(3, 3)).toBe(0);
    });
    test('throws error for non-positive divisor', () => {
        expect(() => sumMultiplesOf(0, 10)).toThrowError(/positive integers/i);
        expect(() => sumMultiplesOf(-1, 10)).toThrowError(/positive integers/i);
    });
    test('throws error for non-positive limit', () => {
        expect(() => sumMultiplesOf(3, 0)).toThrowError(/positive integers/i);
        expect(() => sumMultiplesOf(3, -1)).toThrowError(/positive integers/i);
    });
});

describe('calculateSumOfMultiplesLogic', () => {
    test('Euler example (3, 5, 10)', () => {
        expect(calculateSumOfMultiplesLogic(3, 5, 10)).toBe(23);
    });
    test('Project Euler problem (3, 5, 1000)', () => {
        expect(calculateSumOfMultiplesLogic(3, 5, 1000)).toBe(233168);
    });
    test('custom case (2, 7, 15)', () => { // 2,4,6,7,8,10,12,14 -> sum=63
        expect(calculateSumOfMultiplesLogic(2, 7, 15)).toBe(63);
    });
    test('one divisor multiple of other (2, 4, 10)', () => { // Sum(2s)+Sum(4s)-Sum(8s) = (2+4+6+8)+(4+8)-(8) = 20+12-8 = 24
        expect(calculateSumOfMultiplesLogic(2, 4, 10)).toBe(24);
    });
    test('no multiples found (7, 11, 5)', () => {
        expect(calculateSumOfMultiplesLogic(7, 11, 5)).toBe(0);
    });
    test('throws error for non-positive divisor1', () => {
        expect(() => calculateSumOfMultiplesLogic(0, 5, 10)).toThrowError(/positive integers/i);
    });
    test('throws error for non-positive divisor2', () => {
        expect(() => calculateSumOfMultiplesLogic(3, -5, 10)).toThrowError(/positive integers/i);
    });
    test('throws error for non-positive limit', () => {
        expect(() => calculateSumOfMultiplesLogic(3, 5, 0)).toThrowError(/positive integers/i);
    });
    test('throws error for non-integer inputs', () => {
        expect(() => calculateSumOfMultiplesLogic(3.5, 5, 10)).toThrowError(/positive integers/i);
    });
});
```

### `JavaScript/tests/Problem002Fibonacci.test.js`

```javascript
// Content of JavaScript/tests/Problem002Fibonacci.test.js
// (Worker should insert the full code for Problem002Fibonacci.test.js here,
//  which was created and verified in the current Problem 2 testing subtask)
const { calculateEvenFibonacciSumBasic } = require('../Problem002Fibonacci-basic.js');
const { calculateEvenFibonacciSumRecursive } = require('../Problem002Fibonacci-recursive.js');
const { calculateEvenFibonacciSumSliding } = require('../Problem002Fibonacci-sliding.js');

const testCases = [
    { fn: calculateEvenFibonacciSumBasic, name: 'calculateEvenFibonacciSumBasic (Iterative)', errorRegex: /Please enter a valid positive integer for the limit.|Limit must be a positive integer./i },
    { fn: calculateEvenFibonacciSumRecursive, name: 'calculateEvenFibonacciSumRecursive (Recursive)', errorRegex: /Limit must be a positive integer./i },
    { fn: calculateEvenFibonacciSumSliding, name: 'calculateEvenFibonacciSumSliding (Sliding Window)', errorRegex: /Limit must be a positive integer./i }
];

testCases.forEach(({ fn, name, errorRegex }) => {
    describe(name, () => {
        test('should return correct sum for Project Euler limit 4,000,000', () => {
            expect(fn(4000000)).toBe(4613732);
        });
        test('limit 1 should return 0', () => {
            expect(fn(1)).toBe(0);
        });
        test('limit 2 should return 2', () => {
            expect(fn(2)).toBe(2);
        });
        test('limit 7 should return 2', () => {
            expect(fn(7)).toBe(2);
        });
        test('limit 8 should return 10', () => {
            expect(fn(8)).toBe(10);
        });
        test('limit 10 should return 10', () => {
            expect(fn(10)).toBe(10);
        });
        test('limit 33 should return 10', () => {
            expect(fn(33)).toBe(10);
        });
        test('limit 34 should return 44', () => {
            expect(fn(34)).toBe(44);
        });

        test('limit 0 should throw error', () => {
            expect(() => fn(0)).toThrowError(errorRegex);
        });
        test('limit -5 should throw error', () => {
            expect(() => fn(-5)).toThrowError(errorRegex);
        });
        test('limit 1.5 (non-integer) should throw error', () => {
            expect(() => fn(1.5)).toThrowError(errorRegex);
        });
        test('limit "abc" (non-numeric string) should throw error', () => {
            expect(() => fn("abc")).toThrowError(errorRegex);
        });
        test('limit NaN should throw error', () => {
            expect(() => fn(NaN)).toThrowError(errorRegex);
        });
    });
});
```

## Troubleshooting Environment Issues

The automated environment used to develop these tests sometimes faced issues with `npm` and `jest` execution (e.g., `uv_cwd` errors, `cd` command not working as expected in scripts, `npm test` failing to find scripts). These are likely specific to that environment.

If you encounter issues locally:
*   Ensure Node.js and npm are correctly installed and in your system's PATH.
*   Delete the `node_modules` directory and `package-lock.json` in the `JavaScript` folder and re-run `npm install`.
*   Try running Jest directly if `npm test` fails: `npx jest` (from within `JavaScript` dir) or `node_modules/.bin/jest`.

This guide should help you run the tests successfully on your local machine.
