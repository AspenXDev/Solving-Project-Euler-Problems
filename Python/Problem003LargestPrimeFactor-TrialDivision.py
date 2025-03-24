def largest_prime_factor(n):
    factor = 2

    # Remove all factors of 2
    while n % 2 == 0:
        n //= 2

    # Check odd numbers from 3 onwards
    factor = 3
    while factor * factor <= n:
        while n % factor == 0:
            n //= factor
        factor += 2  # Increment by 2 to check only odd numbers

    # If there's a prime factor left, return it; otherwise, return the last factor checked
    return n if n > 1 else factor