from flask import Flask, render_template, request, jsonify
import time

# Initialize the Flask application
app = Flask(__name__)

# Function to calculate the sum of multiples
def sumMultiples(divisibleBy, limit):
    """Calculate the sum of all numbers below `limit` that are multiples of `divisibleBy`."""
    return sum(i for i in range(limit) if i % divisibleBy == 0)

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    execution_time = None

    if request.method == "POST":
        try:
            # Get values from the form
            multiple1_1 = int(request.form["multiple1_1"])
            multiple1_2 = int(request.form["multiple1_2"])
            limit1 = int(request.form["limit1"])

            # Check for valid inputs
            if multiple1_1 <= 0 or multiple1_2 <= 0 or limit1 <= 0:
                raise ValueError("Please enter positive numbers only.")

            # Start timer
            start_time = time.time()

            # Calculate sum of multiples using the Inclusion-Exclusion principle
            sum_all_multiples = sumMultiples(multiple1_1, limit1) + \
                                 sumMultiples(multiple1_2, limit1) - \
                                 sumMultiples(multiple1_1 * multiple1_2, limit1)

            # End timer
            end_time = time.time()
            execution_time = round((end_time - start_time) * 1000, 2)  # Convert to milliseconds

            result = sum_all_multiples

        except ValueError as e:
            result = str(e)

    return render_template("index.html", result=result, execution_time=execution_time)


if __name__ == "__main__":
    app.run(debug=True)
