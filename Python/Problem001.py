def sum_multiples_of(divisible_by, limit=1000):
    """Calculate the sum of all numbers below `limit` that are multiples of `divisible_by`."""
    return sum(i for i in range(limit) if i % divisible_by == 0)

def sum_AP_of(first_term, d, limit=1000):
    """Use the arithmetic progression sum formula to compute the sum of multiples of `d` below `limit`."""
    n = (limit - 1) // d  # Number of terms in the sequence
    return (n * (2 * first_term + (n - 1) * d)) // 2  # AP sum formula

# Inclusion-Exclusion method using brute-force approach
sum_of_all_multiples = sum_multiples_of(3) + sum_multiples_of(5) - sum_multiples_of(15)

# Arithmetic Progression (AP) series method
sum_all_AP = sum_AP_of(3, 3) + sum_AP_of(5, 5) - sum_AP_of(15, 15)

# Print results
print("Sum of multiples of 3 or 5 below 1000 (brute-force method):", sum_of_all_multiples)
print("Sum of multiples of 3 or 5 below 1000 (AP series method):", sum_all_AP)