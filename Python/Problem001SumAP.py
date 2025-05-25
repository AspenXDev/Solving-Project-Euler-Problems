# This script calculates the sum of multiples of a number below a limit
# using the Arithmetic Progression (AP) sum formula.
# It's a utility function that can be used as part of a solution for
# Project Euler Problem 1 (sum of multiples of 3 or 5 below 1000).

def sum_AP_of(first_term: int, d: int, limit: int = 1000) -> int:
    """
    Calculates the sum of an arithmetic progression.

    This function is specifically tailored here to find the sum of multiples of `d`
    (which should also be the `first_term` in the context of Project Euler Problem 1,
    e.g., for multiples of 3, first_term=3, d=3) strictly below `limit`.

    Parameters:
    first_term (int): The first term in the arithmetic series (e.g., `d` itself).
    d (int):          The common difference of the progression, which is the divisor
                      whose multiples are being summed. Must be positive.
    limit (int):      The exclusive upper bound for the terms in the series.
                      The multiples considered will be less than this limit.

    Returns:
    int: The sum of the arithmetic progression.

    Details:
    - The number of terms `n` is calculated as `(limit - 1) // d`.
      This determines how many multiples of `d` are strictly less than `limit`.
      For example, if limit=10 and d=3, multiples are 3, 6, 9.
      (10-1)//3 = 9//3 = 3 terms.
    - The AP sum formula used is: S_n = n/2 * (2*first_term + (n-1)*d).
      Integer division `//` is used to ensure an integer result where appropriate.
    """
    if d <= 0:
        # Or raise ValueError("Common difference 'd' must be positive for this problem context")
        return 0 # No terms or undefined behavior for non-positive d in this context.

    # Calculate the number of terms in the progression strictly below the limit.
    # For multiples of 'd' starting from 'd' up to 'limit-1'.
    # The largest multiple less than 'limit' is d * ((limit - 1) // d).
    # The number of terms is (limit - 1) // d.
    n = (limit - 1) // d

    if n <= 0:
        return 0 # No terms in the series satisfy the condition.

    # Apply the arithmetic progression sum formula: S_n = n * (a_1 + a_n) / 2
    # where a_1 is the first_term and a_n is the last term.
    # Last term a_n = first_term + (n - 1) * d.
    # So, S_n = n * (first_term + first_term + (n - 1) * d) / 2
    # S_n = n * (2 * first_term + (n - 1) * d) / 2
    # Using integer division // for the final result if all terms are integers.
    sum_val = (n * (2 * first_term + (n - 1) * d)) // 2
    return sum_val

# Example of how to use sum_AP_of to solve Project Euler Problem 1:
# Find the sum of all the multiples of 3 or 5 below 1000.
limit = 1000
sum_multiples_of_3 = sum_AP_of(first_term=3, d=3, limit=limit)
sum_multiples_of_5 = sum_AP_of(first_term=5, d=5, limit=limit)
sum_multiples_of_15 = sum_AP_of(first_term=15, d=15, limit=limit) # For Inclusion-Exclusion

sum_all_AP = sum_multiples_of_3 + sum_multiples_of_5 - sum_multiples_of_15
# Print only the final numerical result or a clear statement.
print(f"The sum of multiples of 3 or 5 below {limit} is: {sum_all_AP}")

# The following line is commented out because `sum_all_AP` is not defined in this script's current scope.
# To run a full test, uncomment the example block above and this print statement (or use the example's print).
# print("Sum of multiples of 3 or 5 below 1000 (AP series method):", sum_all_AP)