// This script calculates the sum of even-valued Fibonacci numbers up to a given limit
// using a basic iterative approach. It interacts with the HTML DOM to get user input
// and display the result and execution time.

/**
 * Calculates the sum of even-valued Fibonacci terms whose values do not exceed `limit`.
 * The Fibonacci sequence is assumed to start with 1 and 2.
 * The function uses a basic iterative approach, generating Fibonacci numbers
 * `a, b, nextFib` and summing `b` if it's even and within the `limit`.
 *
 * @param {number} limit - The inclusive upper bound for Fibonacci numbers.
 *                         Fibonacci numbers greater than this value are not included.
 *                         Must be a positive integer.
 * @returns {number} The sum of even-valued Fibonacci terms up to (and including) `limit`.
 * @throws {Error} If `limit` is not a positive integer.
 */
function calculateEvenFibonacciSumBasic(limit) {
  // Validate that the limit is a positive integer.
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("Please enter a valid positive integer for the limit.");
  }

  let a = 1; // Represents the (n-1)th Fibonacci number
  let b = 2; // Represents the nth Fibonacci number, starting with the first even term
  let sum = 0; // Accumulator for the sum of even Fibonacci numbers

  // Iterate while the current Fibonacci number 'b' is less than or equal to the limit.
  while (b <= limit) {
    // If 'b' is even, add it to the sum.
    // (Note: starting with b=2, every third Fibonacci number is even: 2, 8, 34, ...)
    // This explicit check handles the general case if starting pair wasn't (1,2) or sequence structure was different.
    if (b % 2 === 0) {
      sum += b;
    }
    // Calculate the next Fibonacci number.
    const nextFib = a + b;
    // Update 'a' and 'b' for the next iteration (slide the window).
    a = b;
    b = nextFib;
  }
  return sum; // Return the total sum of even Fibonacci numbers.
}

// Ensures that the script runs after the entire HTML DOM has been fully loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements for repeated use.
  const sumButton = document.getElementById("sumEvenFibonacciBasic"); // Button to trigger calculation
  const resultElement = document.getElementById("result01");         // Element to display the sum
  const executionTimeElement = document.getElementById("executionTime01"); // Element to display execution time
  const limitInput = document.getElementById("limit");               // Input field for the limit

  // Check if the calculation button exists in the DOM to prevent errors.
  if (sumButton) {
    // Attach an event listener to the button for click events.
    sumButton.addEventListener("click", function () {
      // Clear any previous results or error messages from the DOM.
      resultElement.textContent = "";
      executionTimeElement.textContent = "";

      try {
        // Retrieve the limit value from the input field and parse it as an integer.
        const limit = parseInt(limitInput.value, 10);
        
        // Perform an initial check for NaN (Not-a-Number) in case parsing fails (e.g., empty or non-numeric input).
        // More specific validation (positive integer) is handled by `calculateEvenFibonacciSumBasic`.
        if (isNaN(limit)) {
            throw new Error("Input must be a number. Please check your entry.");
        }

        // Record the start time for performance measurement.
        const startTime = performance.now();

        // Call the core logic function to calculate the sum.
        const sum = calculateEvenFibonacciSumBasic(limit);

        // Record the end time and calculate the execution duration.
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2); // Format to 2 decimal places.

        // Display the calculated sum in the designated result element, formatted with commas.
        resultElement.textContent = `${sum.toLocaleString()}`;
        // Display the execution time.
        executionTimeElement.textContent = `${executionTime} ms`;
        console.log("Basic sum calculated:", sum); // Log for debugging

      } catch (error) {
        // If an error occurs (e.g., invalid input), display the error message in the result element.
        resultElement.textContent = error.message;
        console.error("Error during basic calculation:", error.message); // Log error for debugging
      }
    });
  } else {
    // Log an error if the button isn't found, aiding in debugging HTML/JS mismatches.
    console.error("Button with ID 'sumEvenFibonacciBasic' not found.");
  }
});

// Export the core logic function for testing purposes (e.g., using Jest in a Node.js environment).
// This block checks if a module system is present before attempting to export.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateEvenFibonacciSumBasic };
}
