// This JS sums numbers that are multiples of two user-defined number and user-defined limit
// using the Arithmetic Progression Sum method
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculateAPButton")
    .addEventListener("click", calculateByAP);
});

function calculateByAP() {
  // Start timer
  const startTime = performance.now();

  // Get user inputs
  const multiple2_1 = parseInt(
    document.getElementById("multiple2_1").value,
    10
  );
  const multiple2_2 = parseInt(
    document.getElementById("multiple2_2").value,
    10
  );
  const limit2 = parseInt(document.getElementById("limit2").value, 10);

  console.log("Multiple 1:", multiple2_1);
  console.log("Multiple 2:", multiple2_2);
  console.log("Limit:", limit2);

  // Error handling: invalid inputs
  if (
    isNaN(limit2) ||
    isNaN(multiple2_1) ||
    isNaN(multiple2_2) ||
    limit2 <= 0 ||
    multiple2_1 <= 0 ||
    multiple2_2 <= 0
  ) {
    document.getElementById("result02").textContent =
      "Please enter valid positive numbers.";
    document.getElementById("executionTime02").textContent = "";
    return;
  }

  // Function to compute sum of AP sequence: Sn = n/2 * [2a + (n-1)*d]
  function sumAP(a, n, d) {
    return (n / 2) * (2 * a + (n - 1) * d);
  }

  // Helper Function to calculate Greatest Common Divisor (GCD) using Euclidean Algorithm
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  // Helper Function to calculate Least Common Multiple (LCM)
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  // Calculate number of terms in the AP sequence for each multiple
  const n1 = Math.floor((limit2 - 1) / multiple2_1);
  const n2 = Math.floor((limit2 - 1) / multiple2_2);

  // Find LCM of the two numbers to handle double-counting
  const commonMultiple = lcm(multiple2_1, multiple2_2);
  const nCommon = Math.floor((limit2 - 1) / commonMultiple);

  // Compute sums using the AP formula
  const sumMultiple1 = sumAP(multiple2_1, n1, multiple2_1);
  const sumMultiple2 = sumAP(multiple2_2, n2, multiple2_2);
  const sumCommon = sumAP(commonMultiple, nCommon, commonMultiple);

  // Apply inclusion-exclusion principle to avoid double-counting
  const totalSum = sumMultiple1 + sumMultiple2 - sumCommon;
  console.log("Total sum of multiples:", totalSum);

  // Display the result in the DOM
  document.getElementById(
    "result02"
  ).textContent = `${totalSum.toLocaleString()}`;

  // End timer
  const endTime = performance.now();
  // Calculate execution time
  const executionTime02 = (endTime - startTime).toFixed(2);

  // Display execution time
  document.getElementById(
    "executionTime02"
  ).textContent = `${executionTime02} `;
}
