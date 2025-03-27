// This function finds the largest prime factor of a number by optimized trial division
function largestPrimeFactor() {
  let n = parseInt(
    document.getElementById("numberToFindLargestPrimeFactorFor").value,
    10
  );
  if (isNaN(n) || n <= 1) {
    alert("Please enter a valid number greater than 1.");
    return;
  }

  // Start timer
  const startTime = performance.now();

  // Remove factor of 2
  let factor = 2;
  while (n % factor === 0) {
    n /= factor;
  }

  // Check odd numbers from 3 onwards
  factor = 3;
  while (factor * factor <= n) {
    while (n % factor === 0) {
      n /= factor;
    }
    factor += 2; // Increment by 2 to check only odd numbers
  }

  // If n is still greater than 1, then it's the largest prime factor
  let result01 = n > 1 ? n : factor - 2;

  // Calculate the result
  console.log("Largest Prime Factor:", result01);

  // Update the result in the DOM
  document.getElementById("result01").textContent = `${result01}`;

  // End timer
  const endTime = performance.now();
  const executionTime01 = (endTime - startTime).toFixed(2);

  // Display execution time
  document.getElementById(
    "executionTime01"
  ).textContent = `${executionTime01} ms`;
}

// Add event listener to the button after the DOM is fully loaded
window.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("calculateLargestPrimeFactorButton")
    .addEventListener("click", largestPrimeFactor);
});
