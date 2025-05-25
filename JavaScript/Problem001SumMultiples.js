// This script solves Project Euler Problem 1: Sum of multiples of two numbers below a limit.
// It interacts with an HTML page where users can input two numbers and a limit.
// The core calculation uses the Inclusion-Exclusion Principle to find the sum of multiples.
// For example, finding the sum of multiples of 3 or 5 below 1000.

/**
 * Calculates the sum of all numbers strictly below `limit` that are multiples
 * of a single number `divisibleBy`.
 *
 * @param {number} divisibleBy - The number whose multiples are to be summed. Must be a positive integer.
 * @param {number} limit - The exclusive upper bound for the multiples. Must be a positive integer.
 * @returns {number} The sum of the multiples.
 * @throws {Error} If `divisibleBy` or `limit` are not positive integers.
 */
function sumMultiplesOf(divisibleBy, limit) {
  // Validate inputs: must be positive integers.
  if (
    !Number.isInteger(divisibleBy) ||
    !Number.isInteger(limit) ||
    divisibleBy <= 0 ||
    limit <= 0
  ) {
    throw new Error(
      "Inputs to sumMultiplesOf must be positive integers."
    );
  }
  let sum = 0;
  // Iterate from 0 up to (but not including) limit.
  for (let i = 0; i < limit; i++) {
    // If 'i' is a multiple of 'divisibleBy', add it to the sum.
    if (i % divisibleBy === 0) {
      sum += i;
    }
  }
  return sum;
}

/**
 * Calculates the sum of multiples of `divisor1` OR `divisor2` strictly below `limit`.
 * This function uses the Inclusion-Exclusion Principle: Sum(A or B) = Sum(A) + Sum(B) - Sum(A and B).
 * Sum(A and B) is implemented by finding multiples of `divisor1 * divisor2`. This is accurate
 * if `divisor1` and `divisor2` are coprime (e.g., 3 and 5). For non-coprime numbers,
 * the LCM should ideally be used, but `divisor1 * divisor2` is standard for this specific problem's interpretation.
 *
 * @param {number} divisor1 - The first divisor. Must be a positive integer.
 * @param {number} divisor2 - The second divisor. Must be a positive integer.
 * @param {number} limit - The exclusive upper bound for the multiples. Must be a positive integer.
 * @returns {number} The total sum of multiples of `divisor1` or `divisor2` below `limit`.
 * @throws {Error} If `divisor1`, `divisor2`, or `limit` are not positive integers, or if any input is not an integer.
 */
function calculateSumOfMultiplesLogic(divisor1, divisor2, limit) {
  // Validate that all inputs are integers.
  if (
    !Number.isInteger(divisor1) ||
    !Number.isInteger(divisor2) ||
    !Number.isInteger(limit)
  ) {
    throw new Error("All inputs must be integers.");
  }
  // Validate that all inputs are positive.
  if (divisor1 <= 0 || divisor2 <= 0 || limit <= 0) {
    throw new Error("All inputs must be positive integers.");
  }

  // Sum of multiples of the first divisor.
  const sumDivisor1 = sumMultiplesOf(divisor1, limit);
  // Sum of multiples of the second divisor.
  const sumDivisor2 = sumMultiplesOf(divisor2, limit);
  // Sum of common multiples (multiples of divisor1 * divisor2).
  // This addresses the double-counting in sumDivisor1 and sumDivisor2.
  const sumCommonMultiples = sumMultiplesOf(divisor1 * divisor2, limit);

  // Apply the Inclusion-Exclusion Principle.
  return sumDivisor1 + sumDivisor2 - sumCommonMultiples;
}

/**
 * Event handler for the "calculate" button click.
 * It orchestrates fetching inputs, calling the calculation logic,
 * and updating the DOM with the results or errors.
 */
function calculateSimply() {
  // Get DOM elements for displaying results and execution time.
  const resultElement = document.getElementById("result01");
  const executionTimeElement = document.getElementById("executionTime01");
  
  // Clear previous results and execution time from the DOM.
  resultElement.textContent = "";
  executionTimeElement.textContent = "";

  // Start performance timer to measure execution duration.
  const startTime = performance.now();

  try {
    // Fetch input values from the respective DOM input fields.
    // Parse them as base-10 integers.
    const multiple1_1 = parseInt(
      document.getElementById("multiple1_1").value,
      10
    );
    const multiple1_2 = parseInt(
      document.getElementById("multiple1_2").value,
      10
    );
    const limit1 = parseInt(document.getElementById("limit1").value, 10);

    // Initial validation: Check if parsing resulted in NaN (Not-a-Number).
    // This catches empty fields or non-numeric text before calling the core logic.
    if (isNaN(multiple1_1) || isNaN(multiple1_2) || isNaN(limit1)) {
      throw new Error("Inputs must be valid numbers. Please check your entries.");
    }
    
    // Call the core calculation logic with the parsed input values.
    const sumAllMultiples = calculateSumOfMultiplesLogic(
      multiple1_1,
      multiple1_2,
      limit1
    );

    // If calculation is successful, display the formatted sum in the result DOM element.
    resultElement.textContent = `${sumAllMultiples.toLocaleString()}`;
  } catch (error) {
    // If any error occurs (either from input parsing/validation or core logic),
    // display the error message in the result DOM element.
    resultElement.textContent = error.message; 
  } finally {
    // This block executes regardless of whether an error occurred or not.
    // End performance timer.
    const endTime = performance.now();
    // Calculate execution time in milliseconds, formatted to two decimal places.
    const executionTime = (endTime - startTime).toFixed(2);
    // Display the execution time in the designated DOM element.
    executionTimeElement.textContent = `${executionTime} ms`;
  }
}

// Ensures that the DOM is fully loaded and parsed before attaching event listeners.
document.addEventListener("DOMContentLoaded", function () {
  // Get the "Calculate" button element.
  const calculateButton = document.getElementById("calculateSimplyButton");
  // Attach the 'calculateSimply' function to the button's 'click' event.
  if (calculateButton) {
    calculateButton.addEventListener("click", calculateSimply);
  } else {
    console.error("Calculate button not found."); // Optional: error handling if button is missing
  }
});

// Export functions for testing if module is available (e.g., in Node.js/Jest environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sumMultiplesOf, calculateSumOfMultiplesLogic };
}
