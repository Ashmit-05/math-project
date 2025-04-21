import json

def calculate_score(response_content: str) -> int:
    try:
        response_data = json.loads(response_content)
        total = sum(evaluation['marks'] for evaluation in response_data['evaluations'])
        return total
    except (json.JSONDecodeError, KeyError, TypeError) as e:
        print(f"Error calculating score: {e}")
        return 0
