// This JS computes the sum of even Fibbonaci numbers in a recursive manner

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("sumEvenFibonacciRecursive")
    .addEventListener("click", function () {
      const limit = parseInt(document.getElementById("limit").value, 10);
      if (isNaN(limit) || limit <= 0) {
        alert("Please enter a valid number for the limit.");
        return;
      }

      // Start timer
      const startTime = performance.now();

      // Fibonacci summing function
      function sumEvenFibonacciRecursive(limit, a = 1, b = 2, sum = 0) {
        if (b > limit) return sum;
        if (b % 2 === 0) sum += b;
        return sumEvenFibonacciRecursive(limit, b, a + b, sum);
      }

      // Calculate the result
      let result02 = sumEvenFibonacciRecursive(limit);
      console.log("result02", result02);

      // Update the result in the DOM
      document.getElementById(
        "result02"
      ).textContent = `${result02.toLocaleString()}`;

      // End timer
      const endTime = performance.now();
      const executionTime02 = (endTime - startTime).toFixed(2);

      // Display execution time
      document.getElementById(
        "executionTime02"
      ).textContent = `${executionTime02}`;
    });
});
