import string
import math

ALPHABET = string.ascii_uppercase


def mod_inverse(a, m):
    """Find the modular inverse of a modulo m."""
    for x in range(1, m):
        if (a * x) % m == 1:
            return x
    return None


def affine_encrypt(text, a, b):
    result = ""

    for char in text.upper():
        if char in ALPHABET:
            x = ALPHABET.index(char)
            encrypted = (a * x + b) % 26
            result += ALPHABET[encrypted]
        else:
            
            result += char

    return result




plaintext = "A_LITTLE_MATH_NEVER_HURT_NOBODY"

a = 9
b = 11


if math.gcd(a, 26) != 1:
    print("ERROR: 'a' must be coprime with 26.")
else:
    ciphertext = affine_encrypt(plaintext, a, b)

    print("Plaintext: ", plaintext)
    print("a =", a)
    print("b =", b)
    print("Ciphertext:", ciphertext)