// This script finds the largest prime factor of a number using optimized trial division.
// It includes a core logic function and DOM interaction for user input/output.

/**
 * Calculates the largest prime factor of a given number n.
 *
 * @param {number} n - The number to find the largest prime factor for.
 * @returns {number} The largest prime factor of n.
 * @throws {Error} If n is not an integer greater than 1.
 */
function calculateLargestPrimeFactor(n) {
  if (!Number.isInteger(n) || n <= 1) {
    throw new Error("Input must be an integer greater than 1.");
  }

  let maxPrime = -1;

  // Handle factor 2
  if (n % 2 === 0) {
    maxPrime = 2;
    while (n % 2 === 0) {
      n /= 2;
    }
  }

  // Iterate through odd factors
  let factor = 3;
  while (factor * factor <= n) {
    if (n % factor === 0) {
      maxPrime = factor;
      while (n % factor === 0) {
        n /= factor;
      }
    }
    factor += 2;
  }

  // Final Check: If n is still greater than 1 after all divisions,
  // the remaining n is a prime number and is the largest prime factor.
  if (n > 1) {
    maxPrime = n;
  }
  
  // If maxPrime is still -1 (e.g. for n=1 after divisions, though validation should prevent n=1 start)
  // this would be an issue, but the logic ensures maxPrime is updated if n>=2.
  // For n=2, initial maxPrime=2, n becomes 1. Loop for factor=3 doesn't run. Returns 2. Correct.
  // For n=3, initial maxPrime=-1. Loop for factor=3: maxPrime=3, n becomes 1. Returns 3. Correct.
  return maxPrime;
}


// Event handler function for the button click.
// Retrieves input, calls the core logic, and updates the DOM.
function largestPrimeFactor() {
  const resultElement = document.getElementById("result01");
  const executionTimeElement = document.getElementById("executionTime01");
  const numberInput = document.getElementById("numberToFindLargestPrimeFactorFor");

  // Clear previous results
  resultElement.textContent = "";
  executionTimeElement.textContent = "";

  try {
    const n = parseInt(numberInput.value, 10);

    // Initial check for NaN from parsing.
    // The core function calculateLargestPrimeFactor handles more specific validation (n > 1).
    if (isNaN(n)) {
      throw new Error("Input must be a number. Please check your entry.");
    }

    // Start timer
    const startTime = performance.now();

    // Calculate the result using the new standalone function
    const lpf = calculateLargestPrimeFactor(n);

    // End timer
    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(2);

    // Update the result in the DOM
    resultElement.textContent = `${lpf}`;
    executionTimeElement.textContent = `${executionTime} ms`;
    console.log("Largest Prime Factor:", lpf);

  } catch (error) {
    // Display error message in the result element
    resultElement.textContent = error.message;
    console.error("Error during calculation:", error.message);
  }
}

// Add event listener to the button after the DOM is fully loaded
window.addEventListener("DOMContentLoaded", (event) => {
  const calculateButton = document.getElementById("calculateLargestPrimeFactorButton");
  if (calculateButton) {
    calculateButton.addEventListener("click", largestPrimeFactor);
  } else {
    console.error("Button with ID 'calculateLargestPrimeFactorButton' not found.");
  }
});

// Export functions for testing if module is available (e.g., in Node.js/Jest environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateLargestPrimeFactor };
}
