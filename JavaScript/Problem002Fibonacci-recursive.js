// This script calculates the sum of even-valued Fibonacci numbers up to a given limit
// using a recursive approach. It interacts with the HTML DOM to get user input
// and display the result and execution time.

/**
 * Internal recursive helper function; the core recursive engine that calculates the sum.
 * It iteratively builds the Fibonacci sequence and sums even terms.
 *
 * @param {number} limit - The inclusive upper bound for Fibonacci numbers.
 *                         Fibonacci numbers greater than this value are not included.
 * @param {number} a - The previous Fibonacci number in the current step (e.g., F_{n-1}).
 * @param {number} b - The current Fibonacci number in the current step (e.g., F_n).
 * @param {number} sum - The accumulated sum of even Fibonacci numbers found so far.
 * @returns {number} The updated sum of even-valued Fibonacci terms.
 *                   When the base case is met, this is the final sum.
 */
function _calculateEvenFibonacciSumRecursiveInternal(limit, a, b, sum) {
  // Base case: If the current Fibonacci number 'b' exceeds the limit,
  // no more terms can be added; return the accumulated sum.
  if (b > limit) {
    return sum;
  }
  // If the current Fibonacci number 'b' is even, add it to the sum.
  if (b % 2 === 0) {
    sum += b;
  }
  // Recursive step: Call the function with the next pair of Fibonacci numbers (b, a+b)
  // and the updated sum. 'b' becomes the 'previous' number, and 'a+b' becomes the 'current'.
  return _calculateEvenFibonacciSumRecursiveInternal(limit, b, a + b, sum);
}

/**
 * Public interface and validation wrapper for calculating the sum of even-valued
 * Fibonacci terms using recursion. The Fibonacci sequence starts with 1 and 2.
 * It initiates the call to the internal recursive helper function.
 *
 * @param {number} limit - The inclusive upper bound for Fibonacci values.
 *                         Fibonacci numbers greater than this value are not included.
 *                         Must be a positive integer.
 * @returns {number} The sum of even Fibonacci numbers up to (and including) `limit`.
 * @throws {Error} If `limit` is not a positive integer.
 */
function calculateEvenFibonacciSumRecursive(limit) {
  // Validate that the limit is a positive integer.
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("Limit must be a positive integer.");
  }
  // Initial call to the recursive helper with starting Fibonacci values (1, 2) and initial sum (0).
  return _calculateEvenFibonacciSumRecursiveInternal(limit, 1, 2, 0);
}

// Ensures that the script runs after the entire HTML DOM has been fully loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements for repeated use to improve performance and readability.
  const sumButton = document.getElementById("sumEvenFibonacciRecursive"); // Button to trigger calculation
  const resultElement = document.getElementById("result02");            // Element to display the sum
  const executionTimeElement = document.getElementById("executionTime02"); // Element to display execution time
  const limitInput = document.getElementById("limit");                  // Input field for the limit (shared with other methods)

  // Check if the calculation button exists in the DOM to prevent errors if HTML is mismatched.
  if (sumButton) {
    // Attach an event listener to the button for click events.
    sumButton.addEventListener("click", function () {
      // Clear any previous results or error messages from the DOM before new calculation.
      resultElement.textContent = "";
      executionTimeElement.textContent = "";

      try {
        // Retrieve the limit value from the input field and parse it as a base-10 integer.
        const limit = parseInt(limitInput.value, 10);

        // Perform an initial check for NaN (Not-a-Number) if parsing fails (e.g., empty or non-numeric input).
        // The core `calculateEvenFibonacciSumRecursive` function handles more specific validation (positive integer).
        if (isNaN(limit)) {
          throw new Error("Input must be a number. Please check your entry.");
        }

        // Record the start time for performance measurement of the calculation.
        const startTime = performance.now();

        // Call the core logic wrapper function to calculate the sum.
        const sum = calculateEvenFibonacciSumRecursive(limit);

        // Record the end time and calculate the execution duration.
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2); // Format to 2 decimal places.

        // Display the calculated sum in the designated result element, formatted with commas for readability.
        resultElement.textContent = `${sum.toLocaleString()}`;
        // Display the execution time, appending "ms" for clarity.
        executionTimeElement.textContent = `${executionTime} ms`;
        console.log("Recursive sum calculated:", sum); // Log for debugging purposes

      } catch (error) {
        // If an error occurs (e.g., invalid input from parsing or core function validation),
        // display the error message in the result element.
        resultElement.textContent = error.message;
        console.error("Error during recursive calculation:", error.message); // Log error for debugging
      }
    });
  } else {
    // Log an error to the console if the button isn't found, which helps in debugging HTML/JS integration.
    console.error("Button with ID 'sumEvenFibonacciRecursive' not found.");
  }
});

// Export the core logic wrapper function for testing purposes (e.g., using Jest in a Node.js environment).
// This check ensures that `module.exports` is only used in environments where it's defined (like Node.js).
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateEvenFibonacciSumRecursive };
}
