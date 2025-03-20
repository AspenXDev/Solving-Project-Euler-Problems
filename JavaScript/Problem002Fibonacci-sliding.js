// This JS computes the sum of even Fibbonaci numbers in a sliding window manner

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sumEvenFibonacciSliding")
    .addEventListener("click", function () {
      const limit = parseInt(document.getElementById("limit").value, 10);
      if (isNaN(limit) || limit <= 0) {
        alert("Please enter a valid number for the limit.");
        return;
      }

      // Start timer
      const startTime = performance.now();

      // Fibonacci summing function
      function sumEvenFibonacciSliding(limit) {
        let a = 2,
          b = 8,
          sum = 2;
        while (b <= limit) {
          sum += b;
          let temp = 4 * b + a; // Formula to generate next even Fibonacci
          a = b;
          b = temp;
        }
        return sum; // Return the computed sum
      }

      // Calculate the result
      let result03 = sumEvenFibonacciSliding(limit);
      console.log("result03", result03);

      // Update the result in the DOM
      document.getElementById(
        "result03"
      ).textContent = `${result03.toLocaleString()}`;

      // End timer
      const endTime = performance.now();
      const executionTime03 = (endTime - startTime).toFixed(2);

      // Display execution time
      document.getElementById(
        "executionTime03"
      ).textContent = `${executionTime03}`;
    });
});
