// This function checks if a number is a palindrome
function isPalindrome(n) {
  let str = n.toString();
  return str === str.split("").reverse().join("");
}

// Function to find the largest palindrome product
function largestPalindromeProduct() {
  let largest = 0;

  for (let a = 999; a >= 100; a--) {
    for (let b = a; b >= 100; b--) {
      let product = a * b;
      if (product <= largest) break; // Optimization
      if (isPalindrome(product)) {
        largest = product;
      }
    }
  }
  return largest;
}

// Function to handle button click
function handleButtonClick() {
  // Start timer
  const startTime = performance.now();

  // Compute result
  let result01 = largestPalindromeProduct();

  // End timer
  const endTime = performance.now();
  const executionTime01 = (endTime - startTime).toFixed(2);

  // Update the UI
  document.getElementById("result01").textContent = result01;
  document.getElementById(
    "executionTime01"
  ).textContent = `${executionTime01} ms`;

  console.log("Largest Palindrome:", result01);
}

// Add event listener when DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("calculateLargestPalindromeButton")
    .addEventListener("click", handleButtonClick);
});
