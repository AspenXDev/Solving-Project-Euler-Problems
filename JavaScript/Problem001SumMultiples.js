// This JS sums numbers that are multiples of two user-defined number and user-defined limit
// using the bean-counting method
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculateSimplyButton")
    .addEventListener("click", calculateSimply);
});

// Variables multiple1_1, multiple1_2, limit1, received from user
function calculateSimply() {
  // Start timer
  const startTime = performance.now();
  // Get user inputs first
  const multiple1_1 = parseInt(
    document.getElementById("multiple1_1").value,
    10
  );
  const multiple1_2 = parseInt(
    document.getElementById("multiple1_2").value,
    10
  );
  const limit1 = parseInt(document.getElementById("limit1").value, 10);
  console.log("Multiple 1:", multiple1_1);
  console.log("Multiple 2:", multiple1_2);
  console.log("Limit:", limit1);

  // Error handling
  // Handle invalid inputs (NaN cases)
  if (
    isNaN(limit1) ||
    isNaN(multiple1_1) ||
    isNaN(multiple1_2) ||
    limit1 <= 0 ||
    multiple1_1 <= 0 ||
    multiple1_2 <= 0
  ) {
    document.getElementById("resultBeanCounting").textContent =
      "Please enter valid positive numbers.";
    return;
  }

  // Define how to test if a number should be counted
  // (ie. completely divisble by the multiple)
  function sumMultiplesOf(divisibleBy, limit1) {
    let sum = 0;
    for (let i = 0; i < limit1; i++) {
      if (i % divisibleBy === 0) {
        sum += i;
      }
    }
    return sum;
  }

  // Calculate grand total while
  // discounting overlaps that are multiples of both numbers (LCM)
  const sumAllMultiples =
    sumMultiplesOf(multiple1_1, limit1) +
    sumMultiplesOf(multiple1_2, limit1) -
    sumMultiplesOf(multiple1_1 * multiple1_2, limit1);
  console.log("sumAllMultiples value:", sumAllMultiples);

  // Update the result in the DOM
  document.getElementById(
    "result01"
  ).textContent = `${sumAllMultiples.toLocaleString()}`;

  // End timer
  const endTime = performance.now();
  // Calculate execution time
  const executionTime01 = (endTime - startTime).toFixed(2);

  // Display execution time
  document.getElementById(
    "executionTime01"
  ).textContent = `${executionTime01} `;
}
