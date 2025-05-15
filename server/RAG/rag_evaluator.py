from .storage.vector_store import MathKnowledgeBase
from .embeddings.embedder import MathEmbedder
from .retrieval.context_builder import ContextBuilder
from typing import List, Dict
import os

class RAGEvaluator:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        self.knowledge_base = MathKnowledgeBase()
        self.embedder = MathEmbedder(api_key)
        self.context_builder = ContextBuilder(self.knowledge_base, self.embedder)
    
    def get_evaluation_context(self, image_text: str, topic: str = None) -> str:
        """
        Get relevant context for mathematical evaluation
        """
        return self.context_builder.build_evaluation_context(image_text, topic)