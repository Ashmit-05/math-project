import re

def calculate_total_score(input_text):
    # Regular expression to match the pattern "Answer <answer no.> is correct : <marks>"
    pattern = r"Answer \d+[a-zA-Z]? is correct : (\d+)"

    marks = re.findall(pattern, input_text)
    total_score = sum(int(mark) for mark in marks)
    return total_score
