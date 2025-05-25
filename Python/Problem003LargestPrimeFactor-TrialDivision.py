def largest_prime_factor(n: int) -> int:
    """
    Finds the largest prime factor of a given number n.
    Assumes n >= 2.
    """
    max_prime = -1

    # Handle factor 2
    if n % 2 == 0:
        max_prime = 2
        while n % 2 == 0:
            n //= 2

    # Iterate through odd factors
    factor = 3
    while factor * factor <= n:
        if n % factor == 0:
            max_prime = factor
            while n % factor == 0:
                n //= factor
        factor += 2

    # Final Check: If n is still greater than 1 after all divisions,
    # the remaining n is a prime number and is the largest prime factor.
    if n > 1:
        max_prime = n
    
    return max_prime