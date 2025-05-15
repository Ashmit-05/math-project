from ..storage.vector_store import MathKnowledgeBase
from ..embeddings.embedder import MathEmbedder
from typing import List, Dict

class ContextBuilder:
    def __init__(self, knowledge_base: MathKnowledgeBase, embedder: MathEmbedder):
        self.knowledge_base = knowledge_base
        self.embedder = embedder
    
    def build_evaluation_context(self, image_text: str, topic: str = None) -> str:
        # Query relevant rules
        query = f"Mathematical evaluation rules for {topic if topic else 'mathematics'} related to: {image_text}"
        results = self.knowledge_base.query_rules(query)
        
        # Build context string
        context = "Use the following rules and criteria for evaluation:\n\n"
        
        if results and results['documents'] and results['documents'][0]:
            for doc, metadata in zip(results['documents'][0], results['metadatas'][0]):
                context += f"Topic: {metadata['topic']}\n"
                if metadata['subtopic']:
                    context += f"Subtopic: {metadata['subtopic']}\n"
                context += f"Rule:\n{doc}\n\n"
        
        return context