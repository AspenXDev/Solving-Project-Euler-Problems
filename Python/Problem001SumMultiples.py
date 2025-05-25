# Solves Project Euler Problem 1: Sum of multiples of two numbers below a limit.
# This script provides a Flask web interface for the calculation.
# The core logic uses the Inclusion-Exclusion Principle.
# For example, to find the sum of multiples of 3 or 5 below 1000.

from flask import Flask, render_template, request, jsonify
import time

# Initialize the Flask application
app = Flask(__name__)

# Function to calculate the sum of multiples
def sumMultiples(divisibleBy: int, limit: int) -> int:
    """
    Calculates the sum of all numbers strictly below `limit` that are multiples
    of a single number `divisibleBy`.

    This function uses a direct iteration approach.

    Parameters:
    divisibleBy (int): The number whose multiples are to be summed. Must be positive.
    limit (int): The exclusive upper bound for the multiples. Must be positive.

    Returns:
    int: The sum of multiples of `divisibleBy` below `limit`.

    Raises:
    ValueError: If `divisibleBy` or `limit` are not positive integers.
    """
    if not isinstance(divisibleBy, int) or not isinstance(limit, int) or divisibleBy <= 0 or limit <= 0:
        raise ValueError("Inputs to sumMultiples must be positive integers.")
    return sum(i for i in range(limit) if i % divisibleBy == 0)

# Core logic function
def calculate_sum_of_multiples_for_two_divisors(divisor1: int, divisor2: int, limit: int) -> int:
    """
    Calculates the sum of all numbers strictly below `limit` that are multiples
    of `divisor1` OR `divisor2`.

    This function employs the Inclusion-Exclusion Principle:
    Sum(A or B) = Sum(A) + Sum(B) - Sum(A and B)

    Where:
    - Sum(A) is the sum of multiples of `divisor1`.
    - Sum(B) is the sum of multiples of `divisor2`.
    - Sum(A and B) is the sum of multiples of numbers that are multiples of BOTH
      `divisor1` and `divisor2`. For this problem, this is typically taken as
      multiples of `divisor1 * divisor2`. This is accurate if `divisor1` and
      `divisor2` are coprime (like 3 and 5). If they are not coprime, the
      Least Common Multiple (LCM) should be used for `Sum(A and B)`; however,
      Project Euler Problem 1 usually implies `divisor1*divisor2` for the common term.

    Parameters:
    divisor1 (int): The first number whose multiples are considered. Must be positive.
    divisor2 (int): The second number whose multiples are considered. Must be positive.
    limit (int): The exclusive upper bound for the multiples. Must be positive.

    Returns:
    int: The sum of multiples of `divisor1` or `divisor2` below `limit`.

    Raises:
    ValueError: If `divisor1`, `divisor2`, or `limit` are not positive integers,
                or if any input is not an integer.
    """
    if not all(isinstance(arg, int) for arg in [divisor1, divisor2, limit]):
        raise ValueError("All inputs must be integers.")
    if not (divisor1 > 0 and divisor2 > 0 and limit > 0):
        raise ValueError("All inputs must be positive integers.")

    # Calculate sum of multiples for the first divisor
    sum_divisor1 = sumMultiples(divisor1, limit)
    # Calculate sum of multiples for the second divisor
    sum_divisor2 = sumMultiples(divisor2, limit)
    # Calculate sum of multiples for numbers divisible by both (common multiples)
    # Using divisor1 * divisor2 as the common multiple term, common for this problem.
    sum_common_multiples = sumMultiples(divisor1 * divisor2, limit)

    # Apply Inclusion-Exclusion Principle
    return sum_divisor1 + sum_divisor2 - sum_common_multiples

@app.route("/", methods=["GET", "POST"])
def index():
    """
    Handles web requests for the sum of multiples calculator.
    - GET requests: Displays the input form.
    - POST requests: Processes form data, calculates the sum, and displays the result.
    """
    result = None
    execution_time = None
    # Dictionary to store form values to repopulate the form upon submission or error
    form_values = {} 

    if request.method == "POST":
        try:
            # Extract form data from the POST request and convert to integers
            multiple1_1 = int(request.form["multiple1_1"])
            multiple1_2 = int(request.form["multiple1_2"])
            limit1 = int(request.form["limit1"])
            
            # Store current form values for repopulation
            form_values = {
                "multiple1_1": multiple1_1,
                "multiple1_2": multiple1_2,
                "limit1": limit1
            }

            # Start timer for execution time measurement
            start_time = time.time()

            # Call the core logic function to calculate the sum of multiples
            # This is the main calculation step.
            result = calculate_sum_of_multiples_for_two_divisors(multiple1_1, multiple1_2, limit1)

            # End timer and calculate execution time in milliseconds
            end_time = time.time()
            execution_time = round((end_time - start_time) * 1000, 2)

        except ValueError as e:
            # Handle ValueError if inputs are invalid (e.g., non-positive, non-integer)
            # The error message from the core logic functions will be displayed.
            result = str(e)
            # Ensure form values are captured even if initial int conversion failed or values were empty
            if not form_values or not all(form_values.values()): # Repopulate if dict is empty or has falsey values from successful int() but error later
                 form_values = {
                    "multiple1_1": request.form.get("multiple1_1", ""), # Use .get to avoid KeyError
                    "multiple1_2": request.form.get("multiple1_2", ""),
                    "limit1": request.form.get("limit1", "")
                }
        except Exception as e: # Catch any other unexpected errors during processing
            result = f"An unexpected error occurred: {str(e)}"
            # Ensure form values are captured for repopulation
            if not form_values or not all(form_values.values()):
                 form_values = {
                    "multiple1_1": request.form.get("multiple1_1", ""),
                    "multiple1_2": request.form.get("multiple1_2", ""),
                    "limit1": request.form.get("limit1", "")
                }

    # Render the HTML template, passing the result, execution time, and form values
    # These variables are used by Jinja2 in the 'index.html' template.
    return render_template("index.html", result=result, execution_time=execution_time, form_values=form_values)


if __name__ == "__main__":
    # Runs the Flask development server
    # Debug mode is on, which provides helpful error messages and auto-reloads on code changes.
    app.run(debug=True)
