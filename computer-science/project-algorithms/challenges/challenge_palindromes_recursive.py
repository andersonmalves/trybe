def is_palindrome_recursive(word, low_index, high_index):
    if word:
        if len(word) < 2:
            return True

        elif word[low_index] == word[high_index]:
            return is_palindrome_recursive(word[1:-1], 0, len(word[1:-1]) - 1)

        else:
            return False
    else:
        return False


word = ""
print(is_palindrome_recursive(word, 0, len(word) - 1))
