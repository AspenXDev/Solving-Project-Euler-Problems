// This JS computes the sum of even Fibbonaci numbers in a basic iterative manner

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sumEvenFibonacciBasic")
    .addEventListener("click", function () {
      const limit = parseInt(document.getElementById("limit").value, 10);
      if (isNaN(limit) || limit <= 0) {
        alert("Please enter a valid number for the limit.");
        return;
      }

      // Start timer
      const startTime = performance.now();

      // Fibonacci summing function
      function sumEvenFibonacciBasic(limit) {
        let a = 1,
          b = 2,
          sum = 0;

        while (b <= limit) {
          if (b % 2 === 0) {
            sum += b; // Add even Fibonacci number to sum
          }
          let nextFib = a + b;
          a = b;
          b = nextFib;
        }
        return sum;
      }

      // Calculate the result
      let result01 = sumEvenFibonacciBasic(limit);

      // Update the result in the DOM
      document.getElementById(
        "result01"
      ).textContent = `${result01.toLocaleString()}`;
      console.log("result01", result01);
      // End timer
      const endTime = performance.now();
      const executionTime01 = (endTime - startTime).toFixed(2);

      // Display execution time
      document.getElementById(
        "executionTime01"
      ).textContent = `${executionTime01}`;
    });
});
