from typing import List, Dict
import chromadb
from chromadb.config import Settings

class MathKnowledgeBase:
    def __init__(self):
        # Updated configuration
        self.client = chromadb.PersistentClient(
            path="./knowledge_store",
            settings=Settings(
                anonymized_telemetry=False,
                allow_reset=True
            )
        )
        
        # Get or create collection with metadata
        self.collection = self.client.get_or_create_collection(
            name="math_rules",
            metadata={"hnsw:space": "cosine"},  # Using cosine similarity
            embedding_function=None  # We'll handle embeddings separately
        )
    
    def add_rules(self, rules: List[Dict]):
        documents = [rule["rule"] + "\n" + rule["explanation"] for rule in rules]
        metadatas = [{
            "topic": rule["topic"],
            "subtopic": rule.get("subtopic", ""),
            "keywords": ",".join(rule.get("keywords", []))
        } for rule in rules]
        ids = [rule["id"] for rule in rules]
        
        self.collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
    
    def query_rules(self, query: str, n_results: int = 5):
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results,
            include=['documents', 'metadatas']
        )
        return results