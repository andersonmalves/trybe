from typing import Counter


def is_anagram(first_string, second_string):
    return Counter(first_string) == Counter(second_string)


# https://stackoverflow.com/questions/48217471/is-it-possible-to-check-for-anagram-without-using-sorted-or-dictionary-that-pe
first_string = "pedra"
second_string = "perda"
print(is_anagram(first_string, second_string))
