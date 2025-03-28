from itertools import chain, combinations

def is_special_sum_set(A):
    # Generate all possible subsets
    subsets = list(chain(*map(lambda x: combinations(A, x), range(1, len(A) + 1))))

    # Check properties for all subset pairs
    for i in range(len(subsets)):
        for j in range(i + 1, len(subsets)):
            B, C = subsets[i], subsets[j]

            # Property 1: S(B) != S(C)
            if sum(B) == sum(C):
                return False

            # Property 2: If B contains more elements than C, then S(B) > S(C)
            if len(B) > len(C) and sum(B) <= sum(C):
                return False

    return True