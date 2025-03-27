def is_palindrome(n):
    return str(n) == str(n)[::-1]

def largest_palindrome_product():
    largest = 0

    for a in range(999, 99, -1):
        for b in range(a, 99, -1):  # Avoid duplicate pairs
            product = a * b
            if product <= largest:
                break  # No need to check smaller numbers
            if is_palindrome(product):
                largest = product

    return largest

print(largest_palindrome_product())