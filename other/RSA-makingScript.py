from math import gcd;

p = 7138
q = 64
n = p*q
phi = (p-1)*(q-1)
e=17
d = pow(e, -1, phi)

flag = "ctf{well_you_made_it_this_far_well_done}"

m = int.from_bytes(flag.encode(),"big")


c = pow(m, e, n)

print("n =", n)
print("e =", e)
print("c =", c)

"""May or may not be using this later - depends on what i end up deciding to do with this project"""