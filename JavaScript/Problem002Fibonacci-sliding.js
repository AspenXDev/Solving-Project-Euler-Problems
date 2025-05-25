// This script calculates the sum of even-valued Fibonacci numbers up to a given limit
// using an efficient "sliding window" technique that directly generates even Fibonacci numbers.
// It interacts with the HTML DOM to get user input and display the result and execution time.

/**
 * Calculates the sum of even-valued Fibonacci numbers whose values do not exceed `limit`.
 * This function utilizes the property that even Fibonacci numbers follow the sequence:
 * E_n = 4 * E_{n-1} + E_{n-2}, where E_1 = 2 and E_2 = 8.
 * This allows generating only the even terms, making it more efficient than
 * generating all Fibonacci numbers and then checking for evenness.
 *
 * @param {number} limit - The inclusive upper bound for Fibonacci values.
 *                         Fibonacci numbers greater than this value are not included.
 *                         Must be a positive integer.
 * @returns {number} The sum of even Fibonacci numbers up to (and including) `limit`.
 * @throws {Error} If `limit` is not a positive integer.
 */
function calculateEvenFibonacciSumSliding(limit) {
  // Validate that the limit is a positive integer.
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("Limit must be a positive integer.");
  }

  // If the limit is less than the first even Fibonacci number (2), no even terms are included.
  if (limit < 2) {
    return 0;
  }

  let sum = 0;
  let a = 2; // First even Fibonacci number (E_1)
  let b = 8; // Second even Fibonacci number (E_2)

  // Add the first even term 'a' to the sum if it's within the limit.
  // (This is guaranteed if limit >= 2, as checked above).
  sum += a;

  // Loop for subsequent even Fibonacci numbers, starting with 'b'.
  // Add 'b' to the sum only if it's within the limit.
  // Then calculate the next even term using the recurrence relation.
  while (b <= limit) {
    sum += b;
    // Calculate the next even Fibonacci number: E_n = 4 * E_{n-1} + E_{n-2}
    const nextEven = 4 * b + a;
    // Slide the window: 'a' becomes the previous even term, 'b' becomes the current.
    a = b;
    b = nextEven;
  }
  return sum; // Return the total sum.
}

// Ensures that the script runs after the entire HTML DOM has been fully loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements for repeated use to improve performance and readability.
  const sumButton = document.getElementById("sumEvenFibonacciSliding"); // Button to trigger calculation
  const resultElement = document.getElementById("result03");            // Element to display the sum
  const executionTimeElement = document.getElementById("executionTime03"); // Element to display execution time
  const limitInput = document.getElementById("limit");                  // Input field for the limit (shared)

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
        // The core `calculateEvenFibonacciSumSliding` function handles more specific validation (positive integer).
        if (isNaN(limit)) {
          throw new Error("Input must be a number. Please check your entry.");
        }

        // Record the start time for performance measurement of the calculation.
        const startTime = performance.now();

        // Call the core logic function to calculate the sum using the sliding window method.
        const sum = calculateEvenFibonacciSumSliding(limit);

        // Record the end time and calculate the execution duration.
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2); // Format to 2 decimal places.

        // Display the calculated sum in the designated result element, formatted with commas for readability.
        resultElement.textContent = `${sum.toLocaleString()}`;
        // Display the execution time, appending "ms" for clarity.
        executionTimeElement.textContent = `${executionTime} ms`;
        console.log("Sliding window sum calculated:", sum); // Log for debugging purposes

      } catch (error) {
        // If an error occurs (e.g., invalid input from parsing or core function validation),
        // display the error message in the result element.
        resultElement.textContent = error.message;
        console.error("Error during sliding window calculation:", error.message); // Log error for debugging
      }
    });
  } else {
    // Log an error to the console if the button isn't found, which helps in debugging HTML/JS integration.
    console.error("Button with ID 'sumEvenFibonacciSliding' not found.");
  }
});

// Export the core logic function for testing purposes (e.g., using Jest in a Node.js environment).
// This check ensures that `module.exports` is only used in environments where it's defined (like Node.js).
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateEvenFibonacciSumSliding };
}
