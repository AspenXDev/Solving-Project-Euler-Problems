def sum_AP_of(first_term, d, limit=1000):
    """Use the arithmetic progression sum formula to compute the sum of multiples of `d` below `limit`."""
    n = (limit - 1) // d  # Number of terms in the sequence
    return (n * (2 * first_term + (n - 1) * d)) // 2  # AP sum formula

# Print results
print("Sum of multiples of 3 or 5 below 1000 (AP series method):", sum_all_AP)