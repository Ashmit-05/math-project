from openai import OpenAI
from typing import List

class MathEmbedder:
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)
    
    def get_embeddings(self, text: str) -> List[float]:
        response = self.client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding